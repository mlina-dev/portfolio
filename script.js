// variables and constants
const NavOptions = document.querySelectorAll(".nav");
const Main = document.querySelector("main");
const Sections = document.querySelectorAll("section");
var lastDisplayedSection = document.querySelector("#home");
var lastShowedElements = lastDisplayedSection.querySelectorAll(".toggleable");
const ToggleClasses = ["hidden-left", "hidden-right", "disappear"];
var lastNav = document.querySelector("#nav_home");
var navBarClicked = false;

// function
const updateNav = (currentNav) => {
  lastNav.classList.remove("active_nav");
  currentNav.classList.add("active_nav");
  lastNav = currentNav;
};

const displayElement = (element) => {
  element.classList.remove(...ToggleClasses);
};

const hideElement = (element, hiddenClass) => {
  element.classList.add(hiddenClass);
};

const toggleElements = (displayedSection) => {
  let toggleableElements = displayedSection.querySelectorAll(".toggleable");

  // hide elements when section is not displayed, display otherwise
  if (displayedSection != lastDisplayedSection) {
    lastShowedElements.forEach((element) => {
      let hiddenClass = element.dataset.hidden_style;
      if (element.classList.contains(hiddenClass)) return;
      hideElement(element, hiddenClass);
    });

    lastDisplayedSection = displayedSection;
    lastShowedElements = toggleableElements;
  }

  toggleableElements.forEach((element) => {
    displayElement(element);
  });
  // update corresponding nav
  let nav = document.querySelector("#nav_" + displayedSection.id);
  if (navBarClicked == false) updateNav(nav); // avoid unnecessary repetition of nav update when jumping to multiple sections
  navBarClicked = false;
};

//  update active status of nav and jump to corresponding section
NavOptions.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    navBarClicked = true;
    updateNav(event.currentTarget); // avoid delay in status update
    let navId = event.currentTarget.id;
    let clickedSection = navId.replace("nav_", "");
    let section = document.querySelector("#" + clickedSection);

    if (section == null || section == lastDisplayedSection) return; // don't change anything if section is already displayed

    // hide elements before jumping to selected section
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
        toggleElements(entry.target);
      }
    });
  },
  { root: null, threshold: 0.6 },
);

// observe when section is displayed
Sections.forEach((section) => {
  observer.observe(section);
});
