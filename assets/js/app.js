const ToggleNav = document.querySelector(".toggle_nav");
const MenuBtn = document.querySelector(".menu_btn");
const HideNavBtn = document.querySelector(".hide_nav_btn");
const Navigation = document.querySelector(".navigation");
const RoleElement = document.querySelector(".role");
const NavItems = document.querySelectorAll(".nav_item");
const Roles = [
  "Backend Web Developer",
  "Frontend Web Developer",
  "Mobile App Developer",
];
const ProgressLine = document.querySelectorAll(".progress_line");

document.addEventListener("DOMContentLoaded", (event) => {
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

  // scroll to section when nav link is clicked
  scrollToSection(Navigation); // for header navigation
  scrollToSection(ToggleNav); // for slide over navigation

  // observe which section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // change active link
          changeActiveLink(entry.target.id);

          // progress bar animation
          if (entry.target.id === "stack_section") {
            progressAnimation(ProgressLine);
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-100px 0px 0px 0px",
    },
  );

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });
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

const scrollToSection = (navContainer) => {
  navContainer.addEventListener("click", (event) => {
    event.preventDefault();
    let link = event.target.closest("a");
    if (!link) return;

    // scroll into view section
    let section = document.querySelector("#" + link.dataset.value);
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};

const changeActiveLink = (link) => {
  // remove active for header navigation
  let headerActiveLink = Navigation.querySelector(".active");
  if (headerActiveLink) headerActiveLink.classList.remove("active");
  let newHeaderActiveLink = Navigation.querySelector(
    '[data-value="' + link + '"]',
  );
  if (link != "contact_section") newHeaderActiveLink.classList.add("active");

  // remove active for slide over navigation
  let slideOverActiveLink = ToggleNav.querySelector(".active");
  if (slideOverActiveLink) slideOverActiveLink.classList.remove("active");
  let newSlideOverActiveLink = ToggleNav.querySelector(
    '[data-value="' + link + '"]',
  );
  newSlideOverActiveLink.classList.add("active");
};
