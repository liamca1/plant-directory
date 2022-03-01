// list of New Zealand Mushrooms contained in IIFE //
//  mushroomName : {taxonName : "mushroom name" , collectionYear : 0000 , habitat : ['substrate' , 'location' , 'ecosystem']} ,

let mushroomRepository = (function () {
    let mushroomList = [
        { taxonName: "Phlegmacium", collectionYear: 1968, habitat: ['Soil', ' Otago Lakes', ' Forest'] },
        { taxonName: "Agaricales Clem", collectionYear: 1983, habitat: ['Litter', ' Auckland ', ' Forest '] },
        { taxonName: "Boletaceae", collectionYear: 1970, habitat: ['soil', ' Nelson', ' Forest'] }
    ];
  
    return {
      add: function(mushroom) {
        mushroomList.push(mushroom);
      },
      getAll: function() {
        return mushroomList;
      }
    }
  })();
  
// below SHOULD get data from mushroom Repository and then iterate through mushroomList using the forEach function //

mushroomRepository.getAll().forEach(function(mushroom) {
  document.write(mushroom.taxonName + ' was found in ' + mushroom.collectionYear + ' in the following soil, location, & habitat: ' + mushroom.habitat + '</p>');
});