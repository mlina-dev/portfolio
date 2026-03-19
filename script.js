// variables and constants
const NavOptions = document.querySelectorAll(".nav");

// function
const updateNav = (clicked) => {
  NavOptions.forEach((nav) => {
    if (nav == clicked) {
      nav.classList.add("active_nav");
    } else {
      nav.classList.remove("active_nav");
    }
  });
};

//  set navigation to active when corresponding section is viewed
NavOptions.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    updateNav(event.currentTarget);
  });
});
