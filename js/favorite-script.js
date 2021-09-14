const favoritePlaylistContainer= document.getElementById('favoritePlaylistsContainer');


window.onload = ()=>{
    const favorites = localStorage.getItem('favorite')? JSON.parse(localStorage.getItem('favorite')):[];

        addPlayLists(favorites,favoritePlaylistContainer);

        loadingContainer.style.display = 'none';
}