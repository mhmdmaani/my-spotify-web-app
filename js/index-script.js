const heroButton = document.getElementById('hero-button');

/** open menu on mobile */

heroButton.addEventListener('click', () => {
  scrollStartSection.scrollIntoView();
});

window.onload = () => {
  getHomeData();

  setTimeout(() => {
    loadingContainer.style.display = 'none';
  }, 2000);
};
