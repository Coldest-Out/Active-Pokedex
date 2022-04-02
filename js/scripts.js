//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Loads the list of 150 pokemon from the apiUrl
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
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Loads pokemons details from the apiUrl
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      }).catch(function (e) {
        console.error(e);
      });
    }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

//Adding elements to HTML file
  function addListItem(pokemon) {
    //selecting current <ul> in the HTML doc labeled "pokemon-list"
    let pokemonList = document.querySelector(".pokemon-list");
    //creates the list
    let listPokemon = document.createElement("li");
    //Gives list the Bootstrap Class
    listPokemon.classList.add('group-list-item');
    //creates button
    let button = document.createElement("button");
    //makes the button have the pokemons name inside
    button.innerText = pokemon.name;
    //gives button the Bootstrap Class
    button.classList.add("btn-primary");
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('date-target', '#pokemonModal');
    //pushes the button to the HTML
    listPokemon.appendChild(button);
    //pushes the list to the HTML
    pokemonList.appendChild(listPokemon);
    //adds an event to the button, records upon click
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })
  }

  //Shows the pokemon that were clicked on
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
  }

  //Creating Modal for Pokedex
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //Empty contents inside
    modalTitle.empty();
    modalBody.empty();

    //Creating element for name in modal contents
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    //Creating img in the modal
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrl);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);

    //Creating element for height in modal
    let heightElement = $("<p>" + "Height : " + pokemon.height + '-cm' + "</p>");

    //Creating element for weight in modal
    let weightElement = $("<p>" + "Weight : " + pokemon.weight + '-kg' + "</p>");

    //Creating element for type in modal
    let typesElement = $('<p>' + 'Types: ' + pokemon.types.map(i => i.type.name).join(', ') + '<p>');

    //Creating element for abilities in modal
    let abilitiesElement = $("<p>" + "Abilities : " + pokemon.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
  })();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
