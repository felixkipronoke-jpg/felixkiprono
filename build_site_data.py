import csv
import json
import re
from collections import OrderedDict
from pathlib import Path
from urllib.parse import urlparse

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill


ROOT = Path(__file__).resolve().parent
PORTFOLIO_CSV = ROOT / "full_portfolio.csv"
SOCIAL_CSV = ROOT / "social_videos.csv"
DATA_JS = ROOT / "site-data.js"
TEMPLATE_XLSX = ROOT / "website_content_template.xlsx"

PLATFORM_PRIORITY = {"youtube": 0, "tiktok": 1, "instagram": 2}

TOPIC_RULES = OrderedDict(
    [
        ("health", ["health", "healthcare", "hiv", "malaria", "maternal", "nutrition", "usaid"]),
        ("gender", ["femicide", "women", "gender", "gbv", "justice"]),
        ("economics", ["debt", "finance", "bill", "petrol", "electricity", "inflation", "tax", "bank", "price"]),
        ("environment", ["forest", "climate", "environment", "geothermal", "landscape", "volcano", "nyiragongo"]),
        ("governance", ["corrupt", "parliament", "public", "accountability", "government", "civic"]),
        ("migration", ["migrant", "migration", "tourism", "visiting"]),
        ("education", ["school", "students", "education"]),
        ("media", ["storytelling", "journalism", "media", "showreel", "video"]),
    ]
)


def read_csv(path):
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return [clean_row(row) for row in csv.DictReader(handle)]


def clean_row(row):
    return {str(k or "").strip(): str(v or "").strip() for k, v in row.items()}


def normalize_platform(value):
    value = (value or "").strip()
    lower = value.lower()
    if "youtube" in lower:
        return "YouTube"
    if "tiktok" in lower:
        return "TikTok"
    if "instagram" in lower:
        return "Instagram"
    return value


def source_key(row):
    source_id = row.get("source_id", "").strip().lower()
    title = row.get("title", "").strip().lower()
    url = row.get("url") or row.get("video_url") or ""
    parsed = urlparse(url)
    path = parsed.path.rstrip("/").lower()

    if source_id:
        return source_id
    if path:
        return path
    return re.sub(r"[^a-z0-9]+", "-", title).strip("-")


def title_key(row):
    title = row.get("title", "").strip().lower()
    normalized = re.sub(r"[^a-z0-9]+", " ", title).strip()
    if len(normalized) < 18:
        return ""
    return normalized


def platform_rank(row):
    return PLATFORM_PRIORITY.get(normalize_platform(row.get("platform", "")).lower(), 9)


def infer_topics(row):
    provided = row.get("topic", "")
    if provided:
        topics = [re.sub(r"[^a-z0-9]+", "-", part.strip().lower()).strip("-") for part in re.split(r"[,;/]", provided)]
        return [topic for topic in topics if topic] or ["data"]
    haystack = " ".join([row.get("title", ""), row.get("summary", ""), row.get("behind_the_story", "")]).lower()
    topics = [topic for topic, words in TOPIC_RULES.items() if any(word in haystack for word in words)]
    return topics or ["data"]


def infer_year(date):
    match = re.search(r"(20\d{2})", date or "")
    return match.group(1) if match else "Undated"


def fallback_thumbnail(row):
    platform = normalize_platform(row.get("platform", ""))
    url = row.get("url") or row.get("video_url") or ""
    source_id = row.get("source_id", "")
    if platform == "YouTube" and source_id:
        return f"https://i.ytimg.com/vi/{source_id}/hqdefault.jpg"
    if "africadatahub.org" in url:
        return "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/65ae27e01d266d9792150286_65ab49db5648e593287bdee3_femicide_collage.jpg"
    if "bbc.com" in url:
        return "https://ichef.bbci.co.uk/news/1024/branded_news/3EF3/production/_132551161_902fb94d13d63145f38f719ac849bda55684f73f0_0_6720_44801000x667.jpg"
    if "willowhealthmedia.org" in url:
        return "https://willowhealthmedia.org/storage/2025/05/doctor-performing-medical-checkup-patient-scaled.jpg"
    if "debunk.media" in url:
        return "https://debunk.media/wp-content/uploads/Artboard-2-100-6.jpg"
    return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"


def to_item(row):
    content_type = (row.get("content_type") or "video").strip().lower()
    platform = normalize_platform(row.get("platform", ""))
    url = row.get("url") or row.get("video_url") or ""
    publisher = row.get("publisher_client") or row.get("account") or platform
    role = row.get("role", "")

    if content_type == "video" and not role:
        role = "Creator / producer"

    item = {
        "type": content_type,
        "platform": platform,
        "account": row.get("account", ""),
        "title": row.get("title", "Untitled"),
        "date": row.get("date", ""),
        "year": infer_year(row.get("date", "")),
        "summary": row.get("summary", ""),
        "url": url,
        "thumbnail": row.get("thumbnail_url") or fallback_thumbnail(row),
        "sourceId": row.get("source_id", ""),
        "role": role,
        "publisher": publisher,
        "priority": row.get("priority_level", "low priority").lower(),
        "story": row.get("behind_the_story", ""),
    }
    item["topics"] = infer_topics(item)
    return item


def load_items():
    rows = read_csv(PORTFOLIO_CSV)
    for social in read_csv(SOCIAL_CSV):
        rows.append(
            {
                "content_type": "video",
                "platform": social.get("platform", ""),
                "account": social.get("account", ""),
                "title": social.get("title", ""),
                "date": social.get("date", ""),
                "summary": social.get("summary", ""),
                "url": social.get("video_url", ""),
                "thumbnail_url": social.get("thumbnail_url", ""),
                "source_id": social.get("source_id", ""),
                "role": "Creator / producer",
                "publisher_client": social.get("account") or social.get("platform", ""),
                "priority_level": "low priority",
                "behind_the_story": "",
            }
        )

    deduped = {}
    for row in rows:
        if not (row.get("title") or row.get("url") or row.get("video_url")):
            continue
        key = source_key(row)
        current = deduped.get(key)
        if not current or platform_rank(row) < platform_rank(current):
            deduped[key] = row

    by_title = {}
    for row in deduped.values():
        if (row.get("content_type") or "video").lower() == "video":
            key = title_key(row) or source_key(row)
        else:
            key = source_key(row)
        current = by_title.get(key)
        if not current or platform_rank(row) < platform_rank(current):
            by_title[key] = row

    items = [to_item(row) for row in by_title.values()]

    def sort_key(item):
        priority = 0 if item["priority"] == "top priority" else 1
        year = int(item["year"]) if item["year"].isdigit() else 0
        return (priority, -year, item["type"], item["title"].lower())

    return sorted(items, key=sort_key)


def write_data(items):
    payload = {
        "items": items,
        "filters": {
            "types": sorted({item["type"] for item in items}),
            "topics": sorted({topic for item in items for topic in item["topics"]}),
            "years": sorted(
                {item["year"] for item in items},
                key=lambda value: (value == "Undated", -(int(value) if value.isdigit() else 0)),
            ),
        },
    }
    DATA_JS.write_text("window.PORTFOLIO_DATA = " + json.dumps(payload, indent=2) + ";\n", encoding="utf-8")


def write_template():
    headers = [
        "content_type",
        "platform",
        "account",
        "title",
        "date",
        "summary",
        "url",
        "thumbnail_url",
        "source_id",
        "role",
        "publisher_client",
        "priority_level",
        "behind_the_story",
        "topic",
        "notes",
    ]
    wb = Workbook()
    ws = wb.active
    ws.title = "portfolio_content"
    ws.append(headers)
    for cell in ws[1]:
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="111915")
    widths = {
        "A": 16,
        "B": 22,
        "C": 20,
        "D": 46,
        "E": 16,
        "F": 60,
        "G": 54,
        "H": 54,
        "I": 26,
        "J": 26,
        "K": 26,
        "L": 18,
        "M": 70,
        "N": 22,
        "O": 36,
    }
    for column, width in widths.items():
        ws.column_dimensions[column].width = width
    ws.freeze_panes = "A2"
    wb.save(TEMPLATE_XLSX)


if __name__ == "__main__":
    items = load_items()
    write_data(items)
    write_template()
    print(f"Wrote {len(items)} unique items to {DATA_JS.name}")
    print(f"Wrote template to {TEMPLATE_XLSX.name}")
