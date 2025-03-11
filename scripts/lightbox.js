const images = document.querySelectorAll(".project_gallery_grid img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const closeBtn = document.querySelector(".close");
let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[index].src;
  lightbox.style.display = "flex";
}

function changeImage(step) {
  currentIndex = (currentIndex + step + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => showLightbox(index));
});

prevBtn.addEventListener("click", () => changeImage(-1));
nextBtn.addEventListener("click", () => changeImage(1));
closeBtn.addEventListener("click", () => (lightbox.style.display = "none"));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});
