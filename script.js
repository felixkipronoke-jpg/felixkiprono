const groups = [
  {
    title: "Africa Data Hub",
    items: [
      {
        category: "article",
        title: "Lighting Africa: How much does electricity cost across Africa?",
        meta: "Africa Data Hub, Feb 2026 - co-writer and data analyst",
        summary:
          "Compared electricity prices across 33 African countries, with an average of $0.121/kWh; Cabo Verde ranked highest at $0.32/kWh and Kenya second at $0.256/kWh.",
        url: "https://www.africadatahub.org/blog/lighting-africa-how-much-does-electricity-cost-across-africa",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/69788bc7ad9e6f1a27acc8b6_john-day-g3cXOvhTgow-unsplash.jpg",
      },
      {
        category: "article",
        title: "Most African Migrants Stay Within the Continent",
        meta: "Africa Data Hub, Jan 2026 - co-writer and data analyst",
        summary:
          "Used UN Population Division data to show that 18.7 million of 41.4 million African emigrants moved to other Sub-Saharan African countries.",
        url: "https://www.africadatahub.org/blog/most-african-migrants-stay-within-the-continent",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/697889195d48cacd87133be5_andrew-stutesman-l68Z6eF2peA-unsplash.jpg",
      },
      {
        category: "article",
        title: "Africa's Debt to China: Who Owes the Most?",
        meta: "Africa Data Hub, Jan 2026 - co-writer and data analyst",
        summary:
          "Analyzed World Bank data on $61.16 billion in Chinese public loans to African countries from 2015 to 2023, led by Kenya at $6 billion.",
        url: "https://www.africadatahub.org/blog/africas-debt-to-china-who-owes-the-most",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/697885c85606a7969271278b_towfiqu-barbhuiya-M8z2SwSwpbg-unsplash.jpg",
      },
      {
        category: "article",
        title: "Africa's Most Corrupt Countries",
        meta: "Africa Data Hub, Jan 2026 - co-writer and data analyst",
        summary:
          "Used Transparency International CPI data to show Africa's average score at 32.3 out of 100, with only five countries above 50.",
        url: "https://www.africadatahub.org/blog/africas-most-corrupt-countries",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/6978828f5606a796926e0730_jesus-monroy-lazcano-iT1zd7G-fmg-unsplash.jpg",
      },
      {
        category: "article",
        title: "Who is Visiting Africa? A Country-by-Country Look at Tourism",
        meta: "Africa Data Hub, Jan 2026 - co-writer and data analyst",
        summary:
          "Mapped inbound tourism patterns, visitor volumes, source markets, and uneven post-COVID recovery across African countries.",
        url: "https://www.africadatahub.org/blog/who-is-visiting-africa-a-country-by-country-look-at-tourism",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/697868e3d72c15334aea3c3d_ross-parmly-rf6ywHVkrlY-unsplash.jpg",
      },
      {
        category: "article",
        title: "What USAID Funding of African Countries by Sector Looks Like Since 2001",
        meta: "Africa Data Hub, Dec 2025 - co-writer and data analyst",
        summary:
          "Analyzed $131.6 billion in USAID flows to Africa from 2001 to 2024 across humanitarian protection, HIV/AIDS, malaria, and agriculture.",
        url: "https://www.africadatahub.org/blog/what-usaid-funding-of-african-countries-by-sector-looks-like-since-2001",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/693039d0ce09f4e9a01e1c5a_james-wiseman-IebZAH6kaNw-unsplash.jpg",
      },
      {
        category: "article",
        title: "Who Pays More for Petrol in Africa?",
        meta: "Africa Data Hub, Feb 2026 - co-writer and data analyst",
        summary:
          "Compared petrol prices across African countries and the role of subsidies, oil production, and instability in shaping price differences.",
        url: "https://www.africadatahub.org/blog/who-pays-more-for-petrol-in-africa",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/692eb733b35e5e2c233bfdca_jonathan-petersson-EoxzfNEdxOw-unsplash.jpg",
      },
      {
        category: "article",
        title: "Tracking Forest Loss Across Africa",
        meta: "Africa Data Hub, Feb 2026 - co-writer and data analyst",
        summary:
          "Explored deforestation trends, countries losing forest cover fastest, and the underlying drivers of tree cover loss.",
        url: "https://www.africadatahub.org/blog/tracking-forest-loss-across-africa",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/692eaf07cf022868c27dd2e2_raquel-raq-MYjFOiVWWT8-unsplash.jpg",
      },
      {
        category: "database",
        title: "An Insider's Look at the Femicide Database Project",
        meta: "Africa Data Hub, Apr 2024 - project lead and interviewee",
        summary:
          "Explained the methodology, challenges, and editorial decisions behind building Kenya's first femicide database.",
        url: "https://www.africadatahub.org/blog/an-insiders-look-at-the-femicide-database-project",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/65ae27e01d266d9792150286_65ab49db5648e593287bdee3_femicide_collage.jpg",
      },
      {
        category: "database",
        title: "How We Did It: Kenya's First Living Femicide Database",
        meta: "Africa Data Hub, Feb 2024 - co-writer and methodology architect",
        summary:
          "Documented sourcing from media reports and court records, categorization, quality checks, and continuous database updates.",
        url: "https://www.africadatahub.org/blog/how-we-did-it-the-methodology-behind-kenyas-first-living-femicide-database",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/65cdd7f8063fa198af317887_pexels-katerina-holmes-5905747.jpg",
      },
      {
        category: "database",
        title: "Odipodev Launches Silencing Women Database",
        meta: "Africa Data Hub, Jan 2024 - project lead, spokesperson, data analyst",
        summary:
          "Launched a searchable living database tracking more than 500 femicide cases from 2016 to 2023, co-published with Africa Uncensored.",
        url: "https://www.africadatahub.org/blog/odipodev-launches-silencing-women-database-to-illuminate-the-shadows-of-femicide-in-kenya",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/65ae27e01d266d9792150286_65ab49db5648e593287bdee3_femicide_collage.jpg",
      },
      {
        category: "article",
        title: "5 Tips to Master New Media in Your Storytelling",
        meta: "Africa Data Hub, Jan 2024 - writer",
        summary:
          "A practical guide for journalists using video, social media, and data visualization to increase reach and impact.",
        url: "https://www.africadatahub.org/blog/5-tips-to-master-new-media-in-your-storytelling",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/6515352ac56cf64fbae713af_WhatsApp%20Image%202023-08-25%20at%2003.48.20.jpeg",
      },
    ],
  },
  {
    title: "Other publications and projects",
    items: [
      {
        category: "article",
        title: "How the 2024 Finance Bill Reveals the Disconnect Between Parliament and the People",
        meta: "Africa Uncensored, Jun 2024 - writer and data analyst",
        summary:
          "Investigated how Kenya's 2024 Finance Bill exposed the gap between lawmakers and citizens through voting patterns, public outrage, and civic resistance.",
        url: "https://africauncensored.online/blog/2024/06/27/how-the-2024-finance-bill-reveals-the-disconnect-between-parliament-and-the-people/",
        image: "https://africauncensored.online/wp-content/uploads/2024/06/Inside-parliament_0.jpeg",
      },
      {
        category: "database",
        title: "Silencing Women - Kenya Femicide Database",
        meta: "Africa Uncensored / Africa Data Hub, 2024-present - editor, analyst, project manager",
        summary:
          "A public living database combining media reports and court records; referenced by civil society, media outlets, Kenya's High Court, and presidential GBV taskforce discussions.",
        url: "https://femicide.africauncensored.online/",
        image:
          "https://cdn.prod.website-files.com/609a29dfdde412503cff3e96/65ae27e01d266d9792150286_65ab49db5648e593287bdee3_femicide_collage.jpg",
      },
      {
        category: "article",
        title: "The Vanishing Lifeline",
        meta: "Willow Health Media, 2025 - writer, data analyst, project manager",
        summary:
          "Award-winning piece on how US aid cuts could affect Kenya's health sector after roughly $8.3 billion in American funding since 2001.",
        url: "https://willowhealthmedia.org/the-vanishing-lifeline-can-kenyas-healthcare-system-survive-without-us-funding/",
        image:
          "https://willowhealthmedia.org/storage/2025/05/doctor-performing-medical-checkup-patient-scaled.jpg",
      },
      {
        category: "article",
        title: "School Unrests in Kenya",
        meta: "Debunk Media, 2022 - writer, data analyst, video producer and presenter",
        summary:
          "Synthesized three decades of state inquiries into school unrest and visualized recurring triggers behind student strikes.",
        url: "https://debunk.media/school-unrest-debunked/",
        image: "https://debunk.media/wp-content/uploads/Artboard-2-100-6.jpg",
      },
      {
        category: "video",
        title: "School Unrests in Kenya - Video",
        meta: "Debunk Media / YouTube, 2022 - producer and presenter",
        summary:
          "Video companion translating the school unrest data story into an accessible social video format.",
        url: "https://www.youtube.com/watch?v=b85AfkhLg-8",
        image: "https://i.ytimg.com/vi/b85AfkhLg-8/hqdefault.jpg",
      },
    ],
  },
  {
    title: "Training, speaking, and media",
    items: [
      {
        category: "training",
        title: "From Figures to Forests: Data in Storytelling",
        meta: "GLF / CIFOR-ICRAF, 2023 - trainer and presenter",
        summary:
          "Delivered a live demo on using data in environmental storytelling with experts from CIFOR-ICRAF and The Bureau of Investigative Journalism.",
        url: "https://youtu.be/FoppRnunVtM?t=823",
        image: "https://i.ytimg.com/vi/FoppRnunVtM/maxresdefault.jpg",
      },
      {
        category: "training",
        title: "Data Storytelling Training Session",
        meta: "Code for Africa, 2024 - trainer",
        summary:
          "Led a public training session for African journalists on data sourcing, analysis, database building, and narrative construction.",
        url: "https://www.linkedin.com/posts/code-for-africa_join-this-insightful-session-on-the-critical-activity-7188194934783361024-wkLK",
        image:
          "https://media.licdn.com/dms/image/v2/D4D22AQHR-4ViHiMOAw/feedshare-shrink_800/feedshare-shrink_800/0/1713799221202?e=2147483647&v=beta&t=3AElgvrCj3Gq-GMvpAQrFvsM_d0cwwPjIdaK74giMW0",
      },
      {
        category: "training",
        title: "Session on Data Investigations",
        meta: "Africa Investigative Journalism Conference, 2025 - speaker and session lead",
        summary:
          "Shared methods and lessons from the Silencing Women project and other data investigations.",
        url: "https://aijc.africa/",
        image:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

const container = document.querySelector("#portfolio-groups");
const filterButtons = document.querySelectorAll(".filter");

function renderPortfolio(filter = "all") {
  container.innerHTML = "";

  groups.forEach((group) => {
    const items = group.items.filter((item) => filter === "all" || item.category === filter);
    if (!items.length) return;

    const details = document.createElement("details");
    details.className = "portfolio-group";
    details.open = true;

    const summary = document.createElement("summary");
    summary.textContent = `${group.title} (${items.length})`;
    details.append(summary);

    const list = document.createElement("div");
    list.className = "portfolio-list";

    items.forEach((item) => {
      const card = document.createElement("a");
      card.className = "portfolio-card";
      card.href = item.url;
      card.target = "_blank";
      card.rel = "noreferrer";
      card.innerHTML = `
        <img src="${item.image}" alt="" loading="lazy">
        <div>
          <small>${item.meta}</small>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </div>
      `;
      list.append(card);
    });

    details.append(list);
    container.append(details);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderPortfolio(button.dataset.filter);
  });
});

renderPortfolio();

const sectionIds = [...document.querySelectorAll("main section")].map((section) => section.id);
const outlineLinks = [...document.querySelectorAll(".outline nav a")];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    outlineLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    threshold: [0.25, 0.5, 0.75],
  }
);

sectionIds.forEach((id) => observer.observe(document.getElementById(id)));
