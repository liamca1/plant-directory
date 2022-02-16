// list of New Zealand Mushrooms //
let mushroomList = [
    { taxonName: "Phlegmacium", collectionYear: 1968, habitat: ['Soil', 'Otago Lakes', 'Forest'] },
    { taxonName: "Agaricales Clem", collectionYear: 1983, habitat: ['Litter', 'Auckland', 'Forest'] },
    { taxonName: "Boletaceae", collectionYear: 1970, habitat: ['soil', 'Nelson', 'Forest'] }
];

// iterates through mushroomList //
for (let i=0; i < mushroomList.length; i++) {
    if(mushroomList[i].collectionYear > 1980){
        document.write(mushroomList[i].taxonName + "( year identified : " + mushroomList[i].collectionYear + " )" + "This mushroom was only identified recently!")
    }else {
    document.write(mushroomList[i].taxonName + " (year identified : " + mushroomList[i].collectionYear + ") " + " (habitat : " + mushroomList[i].habitat + ")")  
    }
}



//  mushroomName : {taxonName : "mushroom name" , collectionYear : 0000 , habitat : ['substrate' , 'location' , 'ecosystem']} ,

// if(mushroomList[i].collectionYear > 1){

