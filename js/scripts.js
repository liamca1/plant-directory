const pokemonRepository = (function(){
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

  let current_page = 1;
  let rows = 5;

  function add(pokemon) {
    if(typeof pokemon === 'object' && !Array.isArray(pokemon)){
      if(Object.keys(pokemon)[0] === 'name' &&
        Object.keys(pokemon)[1] === 'detailsUrl'){
        pokemonList.push(pokemon);
      }
    }
  }

  function getAll() {
    return pokemonList;
  }
// carousel random function

  // async function displayPokemonCarousel() {
  //   const total = 1126;
  //   const pokeImgUrls = [];
  //   $pokemonCarousel = $(`<div><img src=""</div>`)
  //   for (let i=0; i<5; i++) {
  //     const idx = Math.floor(Math.random() * total);
  //     const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idx}`);
  //     pokeImgUrls.push(poke.sprites.front_default);
  //     $pokemonCarousel += `img src=${poke.sprites.front_default};`
  //   }
  //   $('#carousel').append($PokemonCarousel)
  // }

  function findPokemon(searchName){
    $('.pokemon-list').empty();

    pokemonList.forEach((pokemon) => {
      if (pokemon.name.toLowerCase().includes(searchName.toLowerCase())){
        addListItem(pokemon);
      }
    })
  }

  function loadList(){
    // displayPokemonCarousel();
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let pokemon  = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    });
  }

  function loadDetails(item){
    const url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      details.types.forEach(function (element){
        item.types.push(element.type.name);
      })
    }).catch(function(e){
      console.error(e);
    });
  }

  function addListItem(pokemon) {
    const listGroupElement = document.querySelector('.pokemon-list');
    const listItemButton = document.createElement('button');
    listItemButton.innerText = pokemon.name;
    listItemButton.classList.add('list-group-item', 'list-group-item-action',
      'text-center', 'text-uppercase');

    listItemButton.setAttribute('data-toggle', 'modal');
    listItemButton.setAttribute('data-target', '#pokemonModal');

    listGroupElement.appendChild(listItemButton);

    buttonEventListener(listItemButton,pokemon);
  }

  function buttonEventListener(button,pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    loadList: loadList
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
  });
});

