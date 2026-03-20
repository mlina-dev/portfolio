// variables and constants
const NavOptions = document.querySelectorAll(".nav");
const Main = document.querySelector("main");
const Sections = document.querySelectorAll("section");
var lastDisplayedSection = document.querySelector("#home");
var lastShowedElements = lastDisplayedSection.querySelectorAll(".toggleable");
const ToggleClasses = ["hidden-left", "hidden-right"];
var isScrolling = true;

// function
const updateNav = (currentNav = null) => {
  NavOptions.forEach((nav) => {
    if (nav == currentNav) {
      nav.classList.add("active_nav");
    } else {
      nav.classList.remove("active_nav");
    }
  });
};

const displayElement = (element) => {
  element.classList.remove(...ToggleClasses);
};

const hideElement = (element, hiddenClass) => {
  element.classList.add(hiddenClass);
};

const toggleElements = (displayedSection) => {
  let toggleableElements = displayedSection.querySelectorAll(".toggleable");

  if (displayedSection != lastDisplayedSection) {
    lastShowedElements.forEach((element) => {
      let hiddenClass = element.dataset.hidden_style;
      hideElement(element, hiddenClass);
    });

    lastDisplayedSection = displayedSection;
    lastShowedElements = toggleableElements;
  }

  toggleableElements.forEach((element) => {
    displayElement(element);
  });
  // update active nav when scrolled
  let nav = document.querySelector("#nav_" + displayedSection.id);
  updateNav(nav);
};

//  set navigation to active when corresponding section is viewed
NavOptions.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    updateNav(event.currentTarget);
    let navId = event.currentTarget.id;
    let clickedSection = navId.replace("nav_", "");
    let section = document.querySelector("#" + clickedSection);

    if (section == null) return;

    let toHideElements = lastDisplayedSection.querySelectorAll(".toggleable");
    toHideElements.forEach((element) => {
      hideElement(element, element.dataset.hidden_style);
    });
    setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("intersecting");
        let sectionId = entry.target.id;
        toggleElements(entry.target); // show hidden element for displayed section
      }
    });
  },
  { root: null, threshold: 0.6 },
);

Sections.forEach((section) => {
  observer.observe(section);
});
