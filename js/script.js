const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");
const accessibilityToggle = document.querySelector("#accessibility-toggle");

function setMenuState(isOpen) {
  mainNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");

  const icon = menuToggle.querySelector("svg");
  if (icon) {
    icon.outerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}" aria-hidden="true"></i>`;
    window.lucide?.createIcons();
  }
}

menuToggle.addEventListener("click", () => {
  setMenuState(!mainNav.classList.contains("is-open"));
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuState(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1120) {
    setMenuState(false);
  }
});

function setAccessibleMode(isEnabled) {
  document.body.classList.toggle("accessible", isEnabled);
  accessibilityToggle.setAttribute("aria-pressed", String(isEnabled));
  accessibilityToggle.querySelector("span").textContent = isEnabled
    ? "Обычная версия"
    : "Версия для слабовидящих";
  localStorage.setItem("uisi-accessible-mode", String(isEnabled));
}

accessibilityToggle.addEventListener("click", () => {
  setAccessibleMode(!document.body.classList.contains("accessible"));
});

setAccessibleMode(localStorage.getItem("uisi-accessible-mode") === "true");
window.lucide?.createIcons();
