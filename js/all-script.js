const playlistContainer = document.getElementById('resultPlaylists');
const resultLoadingContainer = document.getElementById('loadingResults');
const categoriesListContainer = document.getElementById('categoriesList');
const searchInput = document.getElementById('searchInput');


const displayCategoryPlaylists = (id) => {
    startLoading();

    getCategoryPlaylists(id).then((results) => {
      addPlayLists(results.items, playlistContainer);

      endLoading();
  });
};
const displaySearchResults = (text) => {
  startLoading();
  searchByText(text).then((results) => {
    addPlayLists(results.items, playlistContainer);
   endLoading();
  });
};




const startLoading = ()=>{
  resultLoadingContainer.style.display = 'flex';
  playlistContainer.style.display = 'none';
}

const endLoading = ()=>{
  resultLoadingContainer.style.display = 'none';
  playlistContainer.style.display = 'grid';
}


window.onload = ()=>{
    
 getCategories().then(results=>{
  results.items.forEach(element => {
    categoriesListContainer.innerHTML+= `
    <li onclick="displayCategoryPlaylists('${element.id}')">
    <img src="${element.icons[0].url}" />
    <span>${element.name}</span>
  </li>
    `
  });
  loadingContainer.style.display= 'none'
 })

 
searchInput.addEventListener('change',(e)=>{

  if(e.target.value.length>3){
   startLoading();
    playlistContainer.style
    searchByText(e.target.value).then(results=>{
      console.log('results');
      console.log(results);
        addPlayLists(results,playlistContainer);
        endLoading();
    })
  }

})
  
}
