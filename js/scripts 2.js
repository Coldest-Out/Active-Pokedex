//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//  let modalContainer = document.querySelector('#modal-container');

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
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          pokemon.abilities.push(details.abilities[i].ability.name);
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
    //creates button
    let button = document.createElement("button");
    //makes the button have the pokemons name inside
    button.innerText = pokemon.name;
    //gives button the class "button-class"
    button.classList.add("button-class");
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
  //    showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
    });
}

//  function showModal(name, height, type, imageUrl) {
  //  let modalContainer = document.querySelector('.modal-container');
//    document.querySelector('.modal_title').innerText = name;

  //  let description = 'Height: ' + height +'cm' + '<br>type: ' + type;
  //  document.querySelector('.modal_text').innerHTML = description;
  //  document.querySelector('.modal_img').setAttribute('src', imageUrl);
  //  console.log(imageUrl);

  //  let closeButton = document.querySelector('.modal-close');
  //  closeButton.addEventListener('click,' hideModal);

  //  window.addEventListener('keydown', (e) => {
    //  console.log(e.key);
  //    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible'))
  //    hideModal();
  //  });

    modalContainer.classList.add('is-visible');
}

  //  function hideModal() {
  //    let modalContainer = document.querySelector('.modal-container');
  //    modalContainer.classList.remove('is-visible');
//    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  //  showModal: showModal,
  //  hideModal: hideModal
  };
  })();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
