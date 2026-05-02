const portfolioData = window.PORTFOLIO_DATA || { items: [], filters: { types: [], topics: [], years: [] } };
const allItems = portfolioData.items || [];

const state = {
  type: "all",
  topic: "all",
  year: "all",
};

const labels = {
  article: "Articles",
  database: "Databases",
  media: "Media",
  training: "Trainings",
  video: "Videos",
  data: "Data",
  economics: "Economics",
  education: "Education",
  environment: "Environment",
  gender: "Gender",
  governance: "Governance",
  health: "Health",
  migration: "Migration",
};

function titleCase(value) {
  return labels[value] || String(value || "").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function itemMatches(item) {
  const typeMatch = state.type === "all" || item.type === state.type;
  const topicMatch = state.topic === "all" || (item.topics || []).includes(state.topic);
  const yearMatch = state.year === "all" || item.year === state.year;
  return typeMatch && topicMatch && yearMatch;
}

function renderFilterGroup(targetId, key, values) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const options = ["all", ...values.filter(Boolean)];
  target.innerHTML = options
    .map((value) => {
      const count =
        value === "all"
          ? allItems.length
          : allItems.filter((item) => {
              if (key === "type") return item.type === value;
              if (key === "topic") return (item.topics || []).includes(value);
              return item.year === value;
            }).length;

      return `<button class="filter ${state[key] === value ? "active" : ""}" data-key="${key}" data-value="${escapeHtml(value)}">
        <span>${value === "all" ? "All" : titleCase(value)}</span>
        <b>${count}</b>
      </button>`;
    })
    .join("");
}

function cardTemplate(item, featured = false) {
  const topics = (item.topics || []).slice(0, 3).map((topic) => `<span>${titleCase(topic)}</span>`).join("");
  const story = item.story
    ? `<details class="story"><summary>Story behind</summary><p>${escapeHtml(item.story)}</p></details>`
    : "";
  const meta = [
    item.publisher || item.platform,
    item.date || item.year,
    item.platform && item.type === "video" ? item.platform : "",
  ]
    .filter(Boolean)
    .join(" / ");

  return `
    <a class="card-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(item.title)}"></a>
    <img src="${escapeHtml(item.thumbnail)}" alt="" loading="lazy">
    <div class="portfolio-card-body">
      <div class="card-meta">${escapeHtml(meta)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <dl>
        <div><dt>Publisher</dt><dd>${escapeHtml(item.publisher || item.platform || "Independent")}</dd></div>
        <div><dt>Role</dt><dd>${escapeHtml(item.role || "Contributor")}</dd></div>
        <div><dt>Date</dt><dd>${escapeHtml(item.date || item.year)}</dd></div>
      </dl>
      <div class="topic-tags">${topics}</div>
      ${story}
      <a class="read-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open source</a>
      ${featured ? '<span class="priority-pill">Featured</span>' : ""}
    </div>
  `;
}

function renderPortfolio() {
  const matched = allItems.filter(itemMatches);
  const featured = matched.filter((item) => item.priority === "top priority");
  const standard = matched.filter((item) => item.priority !== "top priority" && item.type !== "media").slice(0, 24);
  const archive = matched.filter((item) => item.priority !== "top priority" && item.type !== "media").slice(24);

  document.getElementById("portfolio-count").textContent = `${matched.length} matching items`;
  document.getElementById("featured-work").innerHTML = featured
    .map((item) => `<article class="portfolio-card featured">${cardTemplate(item, true)}</article>`)
    .join("");
  document.getElementById("standard-work").innerHTML = standard
    .map((item) => `<article class="portfolio-card">${cardTemplate(item)}</article>`)
    .join("");
  document.getElementById("archive-work").innerHTML = archive
    .map((item) => `<article class="portfolio-card compact-card">${cardTemplate(item)}</article>`)
    .join("");
}

function renderVideos() {
  const videos = allItems
    .filter((item) => item.type === "video")
    .filter((item) => item.url && !item.url.includes("yB8c9eB2N8g"))
    .slice(0, 12);
  document.getElementById("video-work").innerHTML = videos
    .map(
      (item) => `
        <a class="video-mini" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(item.thumbnail)}" alt="" loading="lazy">
          <span>${escapeHtml(item.platform)} / ${escapeHtml(item.date || item.year)}</span>
          <h3>${escapeHtml(item.title)}</h3>
        </a>
      `
    )
    .join("");
}

function renderNews() {
  const news = allItems.filter((item) => item.type === "media").slice(0, 6);
  document.getElementById("news-work").innerHTML = news
    .map(
      (item) => `
        <a class="news-card" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(item.thumbnail)}" alt="" loading="lazy">
          <span>${escapeHtml(item.publisher || item.platform)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary)}</p>
        </a>
      `
    )
    .join("");
}

function renderEvents() {
  const events = allItems.filter((item) => item.type === "training");
  document.getElementById("event-work").innerHTML = events
    .map(
      (item) => `
        <a class="event-card" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
          <img src="${escapeHtml(item.thumbnail)}" alt="" loading="lazy">
          <div>
            <span>${escapeHtml(item.publisher || item.platform)} / ${escapeHtml(item.date || item.year)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
            <strong>Role: ${escapeHtml(item.role || "Trainer / speaker")}</strong>
          </div>
        </a>
      `
    )
    .join("");
}

function bindFilters() {
  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      state[button.dataset.key] = button.dataset.value;
      renderFilterGroup("type-filters", "type", portfolioData.filters.types || []);
      renderFilterGroup("topic-filters", "topic", portfolioData.filters.topics || []);
      renderFilterGroup("year-filters", "year", portfolioData.filters.years || []);
      bindFilters();
      renderPortfolio();
    });
  });
}

function initFilters() {
  renderFilterGroup("type-filters", "type", portfolioData.filters.types || []);
  renderFilterGroup("topic-filters", "topic", portfolioData.filters.topics || []);
  renderFilterGroup("year-filters", "year", portfolioData.filters.years || []);
  bindFilters();
}

initFilters();
renderPortfolio();
renderVideos();
renderNews();
renderEvents();

const outlineLinks = [...document.querySelectorAll(".outline nav a")];
const activeLabel = document.querySelector(".active-section-label");
const menuToggle = document.querySelector(".menu-toggle");
const outline = document.querySelector(".outline");

menuToggle?.addEventListener("click", () => {
  const open = outline.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

outlineLinks.forEach((link) => {
  link.addEventListener("click", () => {
    outline.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = visible.target.id;
    const label = visible.target.dataset.label || id;
    if (activeLabel) activeLabel.textContent = label;

    outlineLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  },
  { threshold: [0.22, 0.45, 0.7] }
);

document.querySelectorAll("main section").forEach((section) => observer.observe(section));
