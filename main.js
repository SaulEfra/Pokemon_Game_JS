// buena practica poner en mayus
const CARDS = 10;

// como usar un api se usa un fecth


//Peticion de pokemones al API
// se redondea con floor y con random se selecciona un nnumero random

for (let i = 1; i <= CARDS; i++) {
    let id = getRandomId(150)
    searchPokemonById(id)
}


function getRandomId(max) {
    return Math.floor(Math.random() * max) + 1
}

let draggableelements = document.querySelector('.draggable-elements')
let droppableElements = document.querySelector('.droppable-elements')


let pokemonSearched = [];
let pokemonnames = [];

async function searchPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    // Arreglos de los pokemons
    pokemonSearched.push(data)
    // Arreglos con los nombres de pokemons
    pokemonnames.push(data.name)

    pokemonnames = pokemonnames.sort(()=>Math.random()-0.5)

    // Estamos dibujando los pokemon
    draggableelements.innerHTML = ''
    pokemonSearched.forEach(pokemon => {
        draggableelements.innerHTML += `
        <div class="pokemon">
            <img id="${pokemon.name}" draggable="true" src="${pokemon.sprites.other['official-artwork'].front_default}" class="image" alt="Pokemon">
        </div>
            `
    })
    // insertando nombres de pokemons
    droppableElements.innerHTML = ''
    pokemonnames.forEach(names => {
        droppableElements.innerHTML += ` 
            <div class="names">
                <p>${names}</p>
            </div>`
    })

    let pokemons = document.querySelectorAll('.image');

    pokemons = [...pokemons]
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart',event=>{
            event.dataTransfer.setData('text',event.target.id)
        })
    })

    let names = document.querySelectorAll('.names')
    let wrongMsg = document.querySelector('.wrong')
    let point = 0;
    names = [...names]
    names.forEach(name =>{
        name.addEventListener('dragover',event=>{
            event.preventDefault()
        });
        name.addEventListener('drop',event=>{
            // console.log('drop')
            const draggableElementData = event.dataTransfer.getData('text')
            let pokemonElement = document.querySelector(`#${draggableElementData}`)
            if(event.target.innerText == draggableElementData){
                console.log("si")
                point++
                event.target.innerHTML = ''
                event.target.appendChild(pokemonElement)
                wrongMsg.innerText = ''
                if(point == CARDS){
                    draggableelements.innerHTML = "<p class='win'>Ganaste!</p>"
                }
            }else{
                console.log("No")
                wrongMsg.innerText = 'Ups!'
            }

        });
    })
}