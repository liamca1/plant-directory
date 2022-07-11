const pokemonRepository = (function(){
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  // async function displayPokemonCarousel() {
  //   const total = 1126;
  //   const pokeImgUrls = [];
  //   $pokemonCarousel = $(`<div><img src="</div>`)
  //   for (let i=0; i<5; i++) {
  //     const idx = Math.floor(Math.random() * total);
  //     axios,get(`https://pokeapi.co/api/v2/pokemon/${idx}`)
  //     $pokemonCarousel += `img src=${poke.sprites.front_default}`
  //   }
  //   $('#carousel').append($pokemonCarousel)
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
        const pokemon  = {
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

  function showModal(pokemon) {
    const modalTitle = $('.modal-title');
    const modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    const titleElement = $('<h1 class="text-uppercase">' + pokemon.name + '</h1>');
    modalTitle.append(titleElement);

    const imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;

    const heightElement = $('<p>' + 'Height: ' + pokemon.height + 'cm' + '</p>');

    const weightElement = $('<p>' + 'Weight: ' + pokemon.weight + 'g' + '</p>');

    const typesElement = $('<p class="text-capitalize">' + 'Types: ' + pokemon.types.join(', ') + '</p>');

    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  return {
    getAll,
    findPokemon,
    addListItem,
    loadList
 };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
  });
});

// horizontal scroll
