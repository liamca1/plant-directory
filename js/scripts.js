let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === "object" && !Array.isArray(pokemon)){
      if(Object.keys(pokemon)[0] === 'name' &&
        Object.keys(pokemon)[1] === 'detailsUrl'){
        pokemonList.push(pokemon);
      }
    }
  }

  function getAll() {
    return pokemonList;
  }
  // function addListItem(pokemon) {
  //   let pokemonList = document.querySelector(".list-group-item");
  //   let listpokemon = document.createElement("li");

  //   let button = document.createElement("button");
  //   button.innerText = pokemon.name;

  //   button.classList.add("button-class");
  //   listpokemon.appendChild(button);
  //   pokemonList.appendChild(listpokemon);
  //   button.addEventListener("click", function(event) {
  //     showDetails(pokemon);
  //   });
  // }

  function loadList(){
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let pokemon = {
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
    let url = item.detailsUrl;
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
    let listGroupElement = document.querySelector('.pokemon-list');
    let listItemButton = document.createElement('button');
    listItemButton.innerText = pokemon.name;
    listItemButton.classList.add('list-group-item', 'list-group-item-action', 'text-center', 'text-uppercase');

    listItemButton.setAttribute('data-toggle', 'modal');
    listItemButton.setAttribute('data-target', '#pokemonModal');

    listGroupElement.appendChild(listItemButton);

    buttonEventListener(listItemButton,pokemon);
  }

  function buttonEventListener(button,pokemon){
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1 class="text-uppercase">' + pokemon.name + '</h1>');
    modalTitle.appeng(titleElement);

    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;

    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    let typesElement = $('<p class="text-capitalize">' + 'Types: ' + pokemon.types.join(', ') +'</p>');

    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});