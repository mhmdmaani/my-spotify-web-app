const url = 'http://192.168.0.4:8000';

const categoriesContainer = document.getElementById('categoriesContainer');
const topContainer = document.getElementById('topLists');
const most = document.getElementById('mostLists');

const favoriteItems =
  localStorage.getItem('favorite') !== null
    ? JSON.parse(localStorage.getItem('favorite'))
    : [];

function getHomeData() {
  fetch(`${url}/test/all`)
    .then((res) => res.json())
    .then((data) => {
      addPlayLists(data.top, topContainer);
      addPlayLists(data.latest, most);
      addCategories(data.categories, categoriesContainer);
    });
}

const addPlayLists = (playlists, container) => {
  playlists.forEach((element) => {
    container.innerHTML += `
       <div class="playlist-item-container">
            <div class="playlist-item">
              <div class="playlist-image">
                <img src="${element.images[0].url}" />
                <div class="play-icon">
                  <a href="${element.external_urls.spotify}">
                    <i class="fa fa-play-circle"></i>
                  </a>
                </div>
              </div>
              <div class="content">
                <h3>${element.name}</h3>
                <div class="playlist-info">
                  <span class="author">
                    <i class="far fa-user-circle"></i> 
                    ${element.owner.display_name} (${element.tracks.total})
                  </span>
                  ${
                    favoriteItems &&
                    favoriteItems.filter((c) => c.id === element.id).length > 0
                      ? '<span><i class="fas fa-heart"></i></span>'
                      : '<span><i class="far fa-heart"></i></span>'
                  }
                </div>
              </div>
            </div>
          </div>
  
  
  `;
  });
};

const addCategories = (categories, container) => {
  categories.forEach((element) => {
    container.innerHTML += `
      <div class="category-list-item">
          <div class="category-image-container">
            <img src="${element.icons[0].url}" />
          </div>
          <span>${element.name}</span>
        </div>
  `;
  });
};

const getCategoryPlaylists = (id) => {
  fetch(`${url}/test/category?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const searchByText = (text) => {
  fetch(`${url}/test/search?key=${text}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const getCategories = () => {
  fetch(`${url}/test/categories`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
