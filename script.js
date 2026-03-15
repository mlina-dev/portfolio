const Sections = document.querySelectorAll("section");
const Header = document.querySelector("header");
const Navigation = document.querySelectorAll(".navigation");
var lastScrollPosition = window.scrollY;

// functions
const hideNavBar = (hide = true) => {
  // hide navigation bar
  if (hide == true) {
    Header.classList.add("hidden_header");
  } else {
    Header.classList.remove("hidden_header");
  }
};

const activeNavigation = (currentPageId) => {
  let navId = currentPageId + "_nav";
  Navigation.forEach((nav) => {
    nav.classList.remove("active");

    if (nav.id === navId) {
        nav.classList.add("active");
    }
  });
};

// event listeners
window.addEventListener("scroll", () => {
  // when scrolling up show navigation bar
  var currentScrollPosition = window.scrollY;
  if (lastScrollPosition > currentScrollPosition) {
    hideNavBar(false);
  } else {
    hideNavBar();
  }
  lastScrollPosition = currentScrollPosition;
});

// observe which section is in display
const Observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        var section = entry.target;
        if (section.id === "landing") {
          hideNavBar(false);
        }

        activeNavigation(section.id)
        console.log(Navigation);
      }
    });
  },
  { threshold: 0.6 },
); // when target is 60% viewed

Sections.forEach((section) => {
  Observer.observe(section);
});
