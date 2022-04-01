function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1 class="text-uppercase">' + pokemon.name + '</h1>');
    modalTitle.append(titleElement);

    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;

    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    let typesElement = $('<p class="text-capitalize">' + 'Types: ' + pokemon.types.join(', ') + '</p>');

    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }