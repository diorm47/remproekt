// redirecter
function scrollToTarget(targetId) {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    scrollToTarget(window.location.hash);
  }
});
