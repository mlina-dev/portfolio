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
// sections
const HomeSection = document.querySelector("#home_section");
const AboutSection = document.querySelector("#about_section");
const StackSection = document.querySelector("#stack_section");
const ProjectSection = document.querySelector("#project_section");
const ContactSection = document.querySelector("#contact_section");

const ProgressLine = document.querySelectorAll(".progress_line");
const ViewMyWorkBtn = document.querySelector(".btn_view_my_work");
const AboutContactBtn = document.querySelector(".btn_about_contact");
const PreviewContainer = document.querySelector(".preview_container");
const PreviewBtn = document.querySelector(".btn_preview");
const CloseBtn = document.querySelector(".close_btn");

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

  // view my work button redirect to projects
  ViewMyWorkBtn.addEventListener("click", (event) => {
    event.preventDefault();

    ProjectSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  // about contact btn redirect to contact
  AboutContactBtn.addEventListener("click", (event) => {
    event.preventDefault();

    ContactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  // preview button
  PreviewBtn.addEventListener("click", (event) => {
    event.preventDefault();

    PreviewContainer.classList.add("active");
  });

  CloseBtn.addEventListener("click", (event) => {
    event.preventDefault();

    PreviewContainer.classList.remove("active");
  });

  // carousel navigation
  const carousel = document.querySelector(".preview .carousel");
  const images = document.querySelectorAll(".preview img");

  const prevBtn = document.querySelector(".preview_left");
  const nextBtn = document.querySelector(".preview_right");

  let currentIndex = 0;

  function updateCarousel() {
    const imageWidth = images[0].offsetWidth;
    const gap = 16; // 2rem

    carousel.style.transform = `translateX(-${currentIndex * (imageWidth + gap)}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);
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
