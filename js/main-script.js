const openMenuBtn = document.getElementById('openMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const scrollBtn = document.getElementById('scroll');
const nav = document.getElementsByTagName('nav')[0];
const navMenuItems = document.querySelectorAll('nav a');
const header = document.getElementsByTagName('header')[0];
const scrollStartSection = document.getElementById('hero');
const playlistItems = document.getElementsByClassName('playlist-item');
const loadingContainer = document.getElementById('loading-container');
/** open menu on mobile */
openMenuBtn.addEventListener('click', function () {
  nav.style.display = 'flex';
});

/** close menu on mobile */
closeMenuBtn.addEventListener('click', function () {
  nav.style.display = 'none';
});

/** close menu on press a */
navMenuItems.forEach((element) => {
  element.addEventListener('click', function () {
    nav.style.display = 'none';
  });
});

/** scroll to top */
scrollBtn.addEventListener('click', () => {
  // scroll to element
  console.log('scrolltop');
  document.getElementsByTagName('main')[0].scrollIntoView();
});

/** onScroll changes */
document.onscroll = () => {
  // 1- controll display or hide scroll
  const currentScroll = document.documentElement.scrollTop;
  const startDisplayingPosition = scrollStartSection.offsetTop;
  if (currentScroll < startDisplayingPosition) {
    scrollBtn.style.display = 'none';
    header.classList.remove('fixedHeader');
  } else {
    scrollBtn.style.display = 'block';
    header.classList.add('fixedHeader');
  }
  // 2- fade playlist elements
  fadeIn();
  // 3- controll header
};

function fadeIn() {
  for (var i = 0; i < playlistItems.length; i++) {
    var elem = playlistItems[i];
    var distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
    if (distInView < 0) {
      elem.classList.add('inView');
    } else {
      elem.classList.remove('inView');
    }
  }
}
window.onload = () => {
 // getHomeData();

  setTimeout(() => {
    loadingContainer.style.display = 'none';
  }, 2000);
};
