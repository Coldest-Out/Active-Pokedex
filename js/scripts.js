//IIFE
let pokemonRepository = (function() {
  let pokemonList = [{
    name: 'Mudkip',
    //height is in meters
    height: 0.4,
    //weight is in kg
    weight: 7.5,
    type: ['water'],
    dexEntryNumber: 258,
    description: 'To alert it, the fin on its head senses the flow of water. It has the strength to heft boulders.',
    strongAgainst: {
      type0: ['grass 2x'],
      type1: ['electric 2x']
    },
    resistances: {
      type0: ['steel 0.5x'],
      type1: ['fire 0.5x'],
      type2: ['water 0.5x'],
      type3: ['ice 0.5x']
    }
  },

  {
    name: 'Marshtomp',
    //height is in meters
    height: 0.7,
    //weight is in kg
    weight: 28,
    type: ['water', 'ground'],
    dexEntryNumber: 259,
    description: 'Its sturdy legs give it sure footing, even in mud. It burrows into dirt to sleep',
    strongAgainst: {
      type0: ['grass 4x'],
      type1: ['electric 2x']
    },
    resistances: {
      type0: ['steel 0.5x'],
      type1: ['fire 0.5x'],
      type2: ['rock 0.5x'],
      type3: ['ground 0.5x'],
      type4: ['poison 0.5x']
    }
  },

  {
    name: 'Swampert',
    //height is in meters
    height: 1.5,
    //weight is in kg
    weight: 81.9,
    type: ['water', 'ground'],
    dexEntryNumber: 300,
    description: 'It can swim while towing a large ship. It bashes down foes with a swing of its thick arms.',
    strongAgainst: {
      type0: ['grass 4x'],
      type1: ['electric 2x']
    },
    resistances: {
      type0: ['steel 0.5x'],
      type1: ['fire 0.5x'],
      type2: ['rock 0.5x'],
      type3: ['ground 0.5x'],
      type4: ['poison 0.5x']
    }
  }];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //Bonus Task?
  function addv(object) {
    pokemonList.typeof(object);
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
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
  })();

  //getAll loop
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Torchic'});
console.log(pokemonRepository.getAll());
