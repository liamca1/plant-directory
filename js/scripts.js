// list of New Zealand Mushrooms contained in IIFE //
//  mushroomName : {taxonName : "mushroom name" , collectionYear : 0000 , habitat : ['substrate' , 'location' , 'ecosystem']} ,

let observationRepository = (function () {
  let observationList = [];
  let apiUrl = '';
}

  // function for adding mushrooms

  function add(observation) {
    if (
      typeof observation === "object" &&
      "taxonName" in observation &&
      "collectionYear" in observation &&
      "habitat" in observation
    ) {
      repository.push(observation);
    } else {
      console.log("observation is not correct");
    }
  }
  function getAll() {
    return repository;
  }

// button

  function addListItem(observation){
    let observationList = document.querySelector(".observation-list");
    let listobservation = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = observation.taxonName;
    button.classList.add("button-class");
    listobservation.appendChild(button);
    observationList.appendChild(listobservation);
    button.addEventListener("click", function (event) {
      showDetails(observation);
    });
  }

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  });.then(function (json) {
    json.results.forEach(function (item) {
      let observation = {
        name: item.name,
        detailsUrl: item.url
      };
      add(observation);
    });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function showDetails(observation) {
    console.log(observation)
  };

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

observationRepository.add({ taxonName: "Agaricus subperonatus", collectionYear: 1968, habitat: ["soil", "Dunedin"] });

console.log(observationRepository.getAll());

// forEach Loop Function:

observationRepository.getAll().forEach(function (observation) {
  observationRepository.addListItem(observation);
});