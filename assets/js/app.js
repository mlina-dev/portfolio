document.addEventListener("DOMContentLoaded", (event) => {
  const ToggleNav = document.querySelector(".toggle_nav");
  const MenuBtn = document.querySelector(".menu_btn");
  const HideNavBtn = document.querySelector(".hide_nav_btn");
  const Navigation = document.querySelector(".navigation");
  const RoleElement = document.querySelector(".role");
  const Roles = [
    "Backend Web Developer",
    "Frontend Web Developer",
    "Mobile App Developer",
  ];
  const ProgressLine = document.querySelectorAll(".progress_line");

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

  // typing animation
  var roleIndex = 0;
  var characterIndex = 0;
  var deleting = false;
  const typingAnimation = () => {
    let currentRole = Roles[roleIndex];

    if (!deleting) {
      RoleElement.textContent = currentRole.substring(0, characterIndex + 1);
      characterIndex++;

      if (characterIndex === currentRole.length) {
        deleting = true;
        setTimeout(typingAnimation, 1500);
        return;
      }

      setTimeout(typingAnimation, 100);
    } else {
      RoleElement.textContent = currentRole.substring(0, characterIndex - 1);
      characterIndex--;

      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % Roles.length;
        setTimeout(typingAnimation, 1000);
        return;
      }

      setTimeout(typingAnimation, 50);
    }
  };

  typingAnimation();

  // progress bar animation
  progressAnimation(ProgressLine);
});

const progressAnimation = (progressBars) => {
  progressBars.forEach((progress) => {
    let value = Number(progress.dataset.value);
    let currentValue = 0;

    let animation = setInterval(() => {
      if (currentValue >= value) {
        clearInterval(animation);
        return;
      }

      currentValue++;
      progress.style.width = currentValue + "%";
    }, 10);
  });
};
