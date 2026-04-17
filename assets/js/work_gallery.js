// constant and global variable
const ZoomIcon = "fa-solid fa-expand";
const GalleryDiv = document.querySelector(".gallery");
const UpcomingProjectImg = "/assets/images/upcoming/resort.jpeg";
const UpcomingCard = upcomingCard();
const Navigation = [
  {
    name: "previous",
    classList: "gallery_navigation prev",
    icon: "fa-solid fa-angle-left",
  },
  {
    name: "next",
    classList: "gallery_navigation next",
    icon: "fa-solid fa-angle-right",
  },
];
const Gallery = [
  {
    title: "title",
    description: "description",
    image: "/assets/images/works/resort.jpeg",
    categories: ["category1", "category2"],
  },
  {
    title: "title1",
    description: "description1",
    image: "/assets/images/works/resort.jpeg",
    categories: ["category11", "category12"],
  },
  {
    title: "title2",
    description: "description2",
    image: "/assets/images/works/resort.jpeg",
    categories: ["category21", "category22"],
  },
  {
    title: "title3",
    description: "description3",
    image: "/assets/images/works/resort.jpeg",
    categories: ["category31", "category32"],
  },
];

// main
window.addEventListener("DOMContentLoaded", () => {
  if (!GalleryDiv) {
    console.log("Gallery Container not found");
    return;
  }

  renderGallery();
});

// functions
function renderGallery() {
  let displayLimit = 3;

  GalleryDiv.innerHTML = "";

  // remove space between styling also display arrows when there are more gallery to show
  if (Gallery.length > displayLimit) {
    //   adding the arrows
    Navigation.forEach((nav) => {
      let navigation = createNavigation(nav);
      GalleryDiv.appendChild(navigation);
    });
  } else {
    GalleryDiv.style.justifyContent = "flex-start";
  }

  let displayedGallery = Gallery.slice(0, displayLimit);

  //   loading cards

  displayedGallery.forEach((item) => {
    const galleryCard = createCard(
      item.title,
      item.description,
      item.image,
      item.categories,
    );
    GalleryDiv.appendChild(galleryCard);
  });

  //   adding the upcoming projects card
  if (Gallery.length < displayLimit) {
    GalleryDiv.appendChild(UpcomingCard);
  }
}

function createCard(title, description, image, categories) {
  let card = document.createElement("div");
  card.className = "card";

  let workInfo = document.createElement("div");
  workInfo.className = "work_info";

  let workTitle = document.createElement("p");
  workTitle.className = "work_title";
  workTitle.textContent = title;

  let workDesc = document.createElement("p");
  workDesc.className = "work_desc";
  workDesc.textContent = description;

  let workCategories = document.createElement("div");
  workCategories.className = "work_categories";

  categories.forEach((item) => {
    let category = document.createElement("p");
    category.className = "work_category";
    category.textContent = item;
    workCategories.appendChild(category);
  });

  let zoomOverlay = document.createElement("div");
  zoomOverlay.className = "zoom_overlay";
  let icon = document.createElement("i");
  icon.className = ZoomIcon;

  zoomOverlay.appendChild(icon);
  workInfo.appendChild(workTitle);
  workInfo.appendChild(workDesc);
  workInfo.appendChild(workCategories);
  card.appendChild(workInfo);
  card.appendChild(zoomOverlay);

  card.style.backgroundImage = `url(${image})`;
  card.style.backgroundPosition = "center";
  card.style.backgroundSize = "cover";

  return card;
}

function upcomingCard() {
  let upcomingCard = document.createElement("div");
  upcomingCard.className = "card upcoming_projects";

  let text = document.createElement("p");
  text.textContent = "Upcoming...";

  upcomingCard.appendChild(text);
  upcomingCard.style.backgroundImage = `url(${UpcomingProjectImg})`;
  upcomingCard.style.backgroundPosition = "center";
  upcomingCard.style.backgroundSize = "cover";

  return upcomingCard;
}

function createNavigation(navigation) {
  let nav = document.createElement("div");
  nav.className = navigation.classList;
  let icon = document.createElement("i");
  icon.className = navigation.icon;
  nav.appendChild(icon);

  return nav;
}
