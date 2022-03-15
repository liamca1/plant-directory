let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
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

  function addListItem(pokemon) {
    let PokemonList = document.querySelector('.list-group');
    let ListPokemon = document.createElement('li');

    let Button = document.createElement('Button');
    Button.innerText = pokemon.name;
    Button.classList.add('list-group-item', 'list-group-item-action', 'text-center');
    Button.setAttribute('data-toggle', 'modal');
    Button.setAttribute('data-target', '#pokemonModal');


    Button.classList.add('btnbtn-primary');
    ListPokemon.classList.add('list-group-item'); 

    ListPokemon.appendChild(Button);
    PokemonList.appendChild(ListPokemon);
    Button.addEventListener('click', function () {
      showDetails(pokemon);
    })
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }



  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "Height: " + pokemon.height;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});