const url = 'http://192.168.0.4:8000';

const categoriesContainer = document.getElementById('categoriesContainer');
const topContainer = document.getElementById('topLists');
const most = document.getElementById('mostLists');

const addToFavorite = (playlist) => {
  const previous = localStorage.getItem('favorite');
  if (!previous) {
    const stringifyPlaylist = JSON.stringify([playlist]);
    localStorage.setItem('favorite', stringifyPlaylist);
  } else {
    const all = JSON.parse(previous);
    const newAll = [...all, playlist];
    const stringifyNewAll = JSON.stringify(newAll);
    localStorage.setItem('favorite', stringifyNewAll);
  }
};

const removeFromFavorite = (playlist) => {
  const previous = localStorage.getItem('favorite');
  if (!previous) {
    return;
  }
  const all = JSON.parse(previous);
  const newAll = all.filter((c) => c.id !== playlist.id);
  const stringifyNewAll = JSON.stringify(newAll);
  localStorage.setItem('favorite', stringifyNewAll);
  // remove from favorite page
  const favoriteContainer = document.getElementById(
    'favoritePlaylistsContainer'
  );

  if (favoriteContainer) {
    document.getElementById(playlist.id).remove();
  }
};

const checkIsFavorite = (playlist) => {
  const previous = localStorage.getItem('favorite');
  if (!previous) {
    return false;
  }
  const jsonFavorite = JSON.parse(previous);
  if (jsonFavorite.filter((c) => c.id === playlist.id).length > 0) {
    return true;
  }
  return false;
};

function getHomeData() {
  fetch(`${url}/test/all`)
    .then((res) => res.json())
    .then((data) => {
      addPlayLists(data.top, topContainer);
      addPlayLists(data.latest, most);
      addCategories(data.categories, categoriesContainer);
    });
}

function onToggleFav(id, name, image, url, owner, tracks) {
  const currentfavicon = document.getElementById(`fav${id}`);

  const pl = {
    id,
    name,
    images: [{ url: image }],
    external_urls: { spotify: url },
    owner: { display_name: owner },
    tracks: { total: tracks },
  };

  if (checkIsFavorite(pl)) {
    removeFromFavorite(pl);
    currentfavicon.classList.remove('fas');
    currentfavicon.classList.add('far');
  } else {
    addToFavorite(pl);
    currentfavicon.classList.remove('far');
    currentfavicon.classList.add('fas');
  }
}

const addPlayLists = (playlists, container) => {
  container.innerHTML = '';
  playlists.forEach((element) => {
    container.innerHTML += `
       <div id=${element.id} class="playlist-item-container">
            <div class="playlist-item">
              <div class="playlist-image">
                <img src="${element.images[0].url}" />
                <div class="play-icon">
                  <a href="${element.external_urls.spotify}" target="_blank">
                    <i class="fa fa-play-circle"></i>
                  </a>
                </div>
              </div>
              <div class="content">
                <h3>${element.name.split('\n')[0]}</h3>
                <div class="playlist-info">
                  <span class="author">
                    <i class="far fa-user-circle"></i> 
                    ${element.owner.display_name} (${element.tracks.total})
                  </span>
                    <span  onclick="onToggleFav('${element.id}','${
      element.name
    }','${element.images[0].url}','${element.external_urls.spotify}','${
      element.owner.display_name
    }','${element.tracks.total}')" ><i id="fav${element.id}"
                       class=" ${
                         checkIsFavorite(element) ? 'fas' : 'far'
                       } fa-heart"></i></span>
              
              
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
  return fetch(`${url}/test/category?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const searchByText = (text) => {
  return fetch(`${url}/test/search?key=${text}`)
    .then((res) => res.json())
    .then((data) => {
      return data.playlists.items;
    });
};

const getCategories = () => {
  return fetch(`${url}/test/categories`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
