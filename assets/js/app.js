document.addEventListener("DOMContentLoaded", (event) => {
  const ToggleNav = document.querySelector(".toggle_nav");
  const MenuBtn = document.querySelector(".menu_btn");
  const HideNavBtn = document.querySelector(".hide_nav_btn");

  //   Hide navigation
  ToggleNav.style.transform = "translateX(300px)";

  //   Toggle navigation
  MenuBtn.addEventListener("click", (event) => {
    ToggleNav.style.transform = "translateX(0px)";
  });

  // Close navigation
  HideNavBtn.addEventListener("click", (event) => {
    ToggleNav.style.transform = "translateX(300px)";
  });
});
