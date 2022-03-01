// list of New Zealand Mushrooms contained in IIFE //
//  mushroomName : {taxonName : "mushroom name" , collectionYear : 0000 , habitat : ['substrate' , 'location' , 'ecosystem']} ,

let mushroomRepository = (function () {
    let mushroomList = [
        { taxonName: "Phlegmacium", collectionYear: 1968, habitat: ['Soil', ' Otago Lakes', ' Forest'] },
        { taxonName: "Agaricales Clem", collectionYear: 1983, habitat: ['Litter', ' Auckland ', ' Forest '] },
        { taxonName: "Boletaceae", collectionYear: 1970, habitat: ['soil', ' Nelson', ' Forest'] }
    ];
  
    function addListItem (mushroom) {
      let mushroomList = document.querySelector(".mushroom-list");
      let listMushroom = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = mushroom.taxonName;
      button.classList.add("button-class")
      listMushroom.appendChild(button);
      mushroomList.apphendChild(listMushroom);
    }

    return {
      add: function(mushroom) {
        mushroomList.push(mushroom);
      },
      getAll: function() {
        return mushroomList;
      }
      addListItem: addListItem
    }
  })();
  
// forEach Loop Function: below SHOULD get data from mushroom Repository and then iterate through mushroomList using the forEach function //

mushroomRepository.getAll().forEach(function(mushroom) {
  mushroomRepository.addListItem(mushroom);
});