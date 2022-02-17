// list of New Zealand Mushrooms //
let mushroomList = [
    { taxonName: "Phlegmacium", collectionYear: 1968, habitat: ['Soil', 'Otago Lakes', 'Forest'] },
    { taxonName: "Agaricales Clem", collectionYear: 1983, habitat: ['Litter', 'Auckland', 'Forest'] },
    { taxonName: "Boletaceae", collectionYear: 1970, habitat: ['soil', 'Nelson', 'Forest'] }
];

// iterates through mushroomList //
for (let i=0; i < mushroomList.length; i++) {
    if(mushroomList[i].collectionYear > 1980){
        document.write(mushroomList[i].taxonName + "( year identified : " + mushroomList[i].collectionYear + " )" + "This mushroom was only identified recently! <br>")
    }else {
    document.write(mushroomList[i].taxonName + " (year identified : " + mushroomList[i].collectionYear + ") " + " (habitat : " + mushroomList[i].habitat + ")<br>")  
    }
}



//  mushroomName : {taxonName : "mushroom name" , collectionYear : 0000 , habitat : ['substrate' , 'location' , 'ecosystem']} ,

/* functions to solve multiple lists problem.

let pokemonList = [
  // Pokémon objects
];

let pokemonList2 = [
  // different set of Pokémon objects
];

function printArrayDetails(list){
  for (let i = 0; i < list.length; i++){
    // document.write("<p>" + list[i].name + "</p>");
    // printing list[i]’s other details
    // ...
  }
}

printArrayDetails(pokemonList); // executes the function using ‘pokemonList‘ as its input

printArrayDetails(pokemonList2); // executes the function using ‘pokemonList2‘ as its input

*/