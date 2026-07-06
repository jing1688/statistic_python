const chapters = [
  ["01", "Google Colab 基礎"],
  ["02", "資料讀取與繪圖"],
  ["03", "盒鬚圖與相關性分析"],
  ["04", "描述統計"],
  ["05", "資料視覺化"],
  ["06", "機率基礎"],
  ["07", "常見機率分配"],
  ["08", "抽樣與抽樣分配"],
  ["09", "信賴區間"],
  ["10", "假設檢定"],
  ["11", "兩組與多組比較"],
  ["12", "相關與迴歸分析"],
  ["13", "綜合專題"]
];

function buildChapterNav() {
  const nav = document.querySelector("#chapter-nav");
  if (!nav) return;

  const isChapterPage = window.location.pathname.includes("/chapters/");
  const prefix = isChapterPage ? "../" : "";
  const current = document.body.dataset.chapter || "home";

  const homeItem = document.createElement("li");
  homeItem.innerHTML = `
    <a href="${prefix}index.html" class="${current === "home" ? "active" : ""}">
      首頁｜課程總覽
    </a>
  `;
  nav.appendChild(homeItem);

  chapters.forEach(([number, title]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${prefix}chapters/ch${number}.html"
         class="${current === number ? "active" : ""}">
        第 ${Number(number)} 章｜${title}
      </a>
    `;
    nav.appendChild(li);
  });
}

function buildPageToc() {
  const toc = document.querySelector("#page-toc-list");
  const article = document.querySelector("main.content");
  if (!toc || !article) return;

  const headings = article.querySelectorAll("h2[id], h3[id]");
  headings.forEach((heading) => {
    const li = document.createElement("li");
    if (heading.tagName === "H3") {
      li.style.paddingLeft = "14px";
    }

    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    li.appendChild(a);
    toc.appendChild(li);
  });
}

function setupMobileMenu() {
  const button = document.querySelector("#menu-button");
  const backdrop = document.querySelector("#backdrop");
  const nav = document.querySelector("#chapter-nav");

  const close = () => document.body.classList.remove("nav-open");

  button?.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  backdrop?.addEventListener("click", close);
  nav?.addEventListener("click", close);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) close();
  });
}

function setYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  buildChapterNav();
  buildPageToc();
  setupMobileMenu();
  setYear();
});