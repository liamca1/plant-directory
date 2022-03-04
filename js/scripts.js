// list of New Zealand Mushrooms contained in IIFE //
//  mushroomName : {taxonName : "mushroom name" , collectionYear : 0000 , habitat : ['substrate' , 'location' , 'ecosystem']} ,

let mushroomRepository = (function () {
  let repository = [
    {
      taxonName: "Phlegmacium",
      collectionYear: 1968,
      habitat: ["Soil", "Otago Lakes", "Forest"],
    },
    {
      taxonName: "Agaricales Clem",
      collectionYear: 1983,
      habitat: ["Litter", "Auckland", "Forest"],
    },
    {
      taxonName: "Boletaceae",
      collectionYear: 1970,
      habitat: ["Soil", "Nelson", "Forest"],
    },
  ];

  // function for adding mushrooms
  
  function add(mushroom) {
    if (
      typeof mushroom === "object" &&
      "taxonName" in mushroom &&
      "collectionYear" in mushroom &&
      "habitat" in mushroom
    ) {
      repository.push(mushroom);
    } else {
      console.log("mushroom is not correct");
    }
  }
  function getAll() {
    return repository;
  }
  
// button
  
  function addListItem(mushroom){
    let mushroomList = document.querySelector(".mushroom-list");
    let listmushroom = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = mushroom.taxonName;
    button.classList.add("button-class");
    listmushroom.appendChild(button);
    mushroomList.appendChild(listmushroom);
    button.addEventListener("click", function (event) {
      console.log(event)
    });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

  function showDetails(mushroom) {
    console.log(mushroom)
  };

})();

mushroomRepository.add({ taxonName: "Agaricus subperonatus", collectionYear: 1968, habitat: ["soil", "Dunedin"] });

console.log(mushroomRepository.getAll());

// forEach Loop Function:

mushroomRepository.getAll().forEach(function (mushroom) {
  mushroomRepository.addListItem(mushroom);
});

