const playlistContainer = document.getElementById('resultPlaylists');
const loadingContainer = document.getElementById('loadingResults');

const displayCategoryPlaylists = (id) => {
  loadingContainer.style.display = 'flex';
  playlistContainer.style.display = 'none';
  getCategoryPlaylists(id).then((results) => {
    addPlayLists(results, playlistContainer);
    loadingContainer.style.display = 'none';
    playlistContainer.style.display = 'flex';
  });
};
const displaySearchResults = (text) => {
  loadingContainer.style.display = 'flex';
  playlistContainer.style.display = 'none';

  searchByText(text).then((results) => {
    loadingContainer.style.display = 'none';
    playlistContainer.style.display = 'flex';
  });
};
