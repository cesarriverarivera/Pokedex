const divCharacters = document.querySelector("#characters");
const selectList = document.querySelector("#list");
const limit = "1000";
const pokeUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
const pokeUrlInfo = `https://pokeapi.co/api/v2/pokemon`;
const btnBuscar = document.querySelector("#btn-buscar");

const imagePoke = document.querySelector("#img-poke");
const pokemonName = document.querySelector("#pokemonName");
const contentInfo = document.querySelector("#content-info");

fetch(pokeUrl)
    .then(response => response.json())
    .then(data =>{
        const resultados =data.results
        resultados.forEach(result =>{
            const pokeName =[result]  //obtengo la lista de pokemones
            //console.log(pokeName)
            listaPokemon(pokeName)
        })
    })

function obtenerInfoPokemon (nombre){
    imagePoke.innerHTML=""; //limpia el cuadro de la imagen
    pokemonName.innerHTML=""; //limpia el nombre del pokemon
    contentInfo.innerHTML=""; //limpia el contenido de tipo y habilidades
    fetch(`${pokeUrlInfo}/${nombre}`)
    .then(response => response.json())
    .then(data =>{
        const info = data;
        displayInfoPokemon(info)
        console.log(data)
    })
}


//funcion para llenar el select con los nombres de pokemones disponible
function listaPokemon (lista){ 
    const option = document.createElement("option")
    lista.forEach(ele =>{
        option.innerHTML =ele.name
        selectList.appendChild(option)
    })
}

//dar click en buscar

btnBuscar.addEventListener("click", ()=>{
    //forma de acceder al texto del option seleccionado
    const selected =selectList.options[selectList.selectedIndex].text 
    console.log(selected)
    obtenerInfoPokemon(selected) 
})

//funcion para llenar info detallada de los pokemones
function displayInfoPokemon (info){
    const imgPoke = info.sprites.front_default //ubicacion de la imagen Api
    const img =document.createElement("img");
    img.setAttribute("src",imgPoke)
    img.classList.add("image-display");
    imagePoke.appendChild(img);

    const namePoke = info.name //ubicacion del nombre en Api
    const name = document.createElement("p")
    name.innerHTML = `${namePoke}`
    pokemonName.appendChild(name)

    const typePoke = info.types //ubicacion de tipo de pokemon
    const typePokemon = document.createElement("p")
    let contentIni="";
        typePoke.forEach(ele =>{
           const type=  ele.type.name
           contentIni = ` ${contentIni} ${type} `
           typePokemon.textContent = `Tipo: ${contentIni}` 
           contentInfo.appendChild(typePokemon)
        })
    

    const abilitiePoke = info.abilities //ubicacion de habilidades pokemon
    const abilitiePokemon = document.createElement("p")
    let contentabilitie = "";
        abilitiePoke.forEach(ele =>{
            const abilitie = ele.ability.name
            contentabilitie = `${contentabilitie} ${abilitie}`
            abilitiePokemon.textContent = `Habilidades: ${contentabilitie}`
            contentInfo.appendChild(abilitiePokemon)
        })
}



//datos a cargar cuando se carga la pagina por primera vez
window.addEventListener("load", ()=>{
    pokemonName.innerHTML=
    `<p>...</p>
    `;

    imagePoke.innerHTML = 
    `<img class="image-display" src="/assets/images/pokemon-entrenadores.jpg" alt="pokemon">
    `;
})