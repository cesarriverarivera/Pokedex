const divCharacters = document.querySelector("#characters");
const selectList = document.querySelector("#list");
const limit = "1280";
const pokeUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`; //para listar los pokemones
const pokeUrlInfo = `https://pokeapi.co/api/v2/pokemon`; //para consultar informacion pokemon
const btnBuscar = document.querySelector("#btn-buscar");

const imagePoke = document.querySelector("#img-poke");
const pokemonName = document.querySelector("#pokemonName");
const contentInfo = document.querySelector("#content-info");
const weigth = document.querySelector("#weigth");
const baseExperience = document.querySelector("#baseExperience");

const cirucloInterior= document.querySelector("#inside-circle"); //identificador del circulo

const btnChangeInfo = document.querySelector("#btn-change-info");

const leftSide = document.querySelector("#left");
const rigthSide = document.querySelector("#rigth");



fetch(pokeUrl)
    .then(response => response.json())
    .then(data =>{
        const resultados =data.results
        resultados.sort((x, y) => x.name.localeCompare(y.name)) //ordena al respuesta en orden alfabetico
        resultados.forEach(result =>{
            const pokeName =[result]  //obtengo la lista de pokemones
            //console.log(pokeName)
            listaPokemon(pokeName)
        })
    })
    .catch(error => console.log(`error es: ${error}`))


function obtenerInfoPokemon (nombre){
    imagePoke.innerHTML=""; //limpia el cuadro de la imagen
    pokemonName.innerHTML=""; //limpia el nombre del pokemon
    contentInfo.innerHTML=""; //limpia el contenido de tipo y habilidades
    baseExperience.innerHTML="";//limpia el contenido de experiencia
    weigth.innerHTML=  ""; //limpia el contenido de peso
    btnChangeInfo.innerHTML=`<img src="/assets/images/ataque.png">`; //limpia boton de movimientos
    btnChangeInfo.classList.remove("cambiar-color"); //quita clase para estilar boton de movimientos

    fetch(`${pokeUrlInfo}/${nombre}`)
    .then(response => response.json())
    .then(data =>{
        const info = data;
        displayInfoPokemon(info) //muestra la info basica en display
        console.log(data)

        //evento para mostar info de movements de pokemon
        btnChangeInfo.addEventListener("click", ()=>{
            contentInfo.innerHTML= "";
            displayMoreInfoPokemon(info);
            btnChangeInfo.classList.add("cambiar-color")
        })
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

//para remover la clase que anima y camabia de color al circulo
selectList.addEventListener("click", ()=>{
    cirucloInterior.classList.remove("animacion-circulo")
})


//dar click en buscar

btnBuscar.addEventListener("click", ()=>{
    //forma de acceder al texto del option seleccionado
    const selected =selectList.options[selectList.selectedIndex].text 
    console.log(selected)
    obtenerInfoPokemon(selected) 

    //agregando animaciones al circulo
    cirucloInterior.classList.add("animacion-circulo");
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
           typePokemon.innerHTML = `<b>Type</b>: ${contentIni}` 
           contentInfo.appendChild(typePokemon)
        })
    

    const abilitiePoke = info.abilities //ubicacion de habilidades pokemon
    const abilitiePokemon = document.createElement("p")
    let contentabilitie = "";
        abilitiePoke.forEach(ele =>{
            const abilitie = ele.ability.name
            if(contentabilitie ===""){
                contentabilitie = `${contentabilitie} ${abilitie}`
            }else{
                contentabilitie = `${contentabilitie}, ${abilitie}`
            }
            abilitiePokemon.innerHTML = `<b>Abilities</b>: ${contentabilitie}`
            abilitiePokemon.classList.add("content-p")
            contentInfo.appendChild(abilitiePokemon)
        })

    const baseExp = info.base_experience  //ubicacio de expriencia base pokemon
    const baseExpPoke = document.createElement("p")
    baseExpPoke.innerHTML =`Exp base: ${baseExp}`
    baseExperience.appendChild(baseExpPoke)

    const pokeWeigth = info.weight
    const weigthPoke = document.createElement("p")
    weigthPoke.innerHTML= `Peso: ${pokeWeigth}`
    weigth.appendChild(weigthPoke)

}

//funcion para obtener informacion al hacer click boton movements
function displayMoreInfoPokemon (info){
    const moves = info.moves
    const movespoke = document.createElement("p")
    let movements = "";
        moves.forEach(ele=>{
            const movePokemon = ele.move.name
            
            movements = `${movements} ${movePokemon}<br>`
           
            movespoke.innerHTML= `<b>MOVIMIENTOS POKEMON</b>:<br> ${movements}`
            movespoke.classList.add("content-p")
            contentInfo.appendChild(movespoke)
        })
    
    btnChangeInfo.innerHTML = `${moves.length}` //agrega la cantidad de movimientos al boton
}

//datos a cargar cuando se carga la pagina por primera vez
window.addEventListener("load", ()=>{
    pokemonName.innerHTML=
    `<p>...</p>
    `;

    imagePoke.innerHTML = 
    `<img class="image-display" src="/assets/images/pokemon-entrenadores.jpg" alt="pokemon">
    `;

    weigth.innerHTML=
    `<p>...</p>
    `;

    baseExperience.innerHTML=
    `<p>...</p>
    `;
    btnChangeInfo.innerHTML=`
    <img src="/assets/images/ataque.png">
    `;
})




//responsive escuchando ancho de pantalla
window.addEventListener("resize", ()=>{
    console.log(screen.width)
    const size = screen.width
    if(size<=900 && size >=300){
        leftSide.classList.remove("col-4")
        rigthSide.classList.remove("col-4")
        leftSide.classList.add("col-6")
        rigthSide.classList.add("col-6")
    } else{
        leftSide.classList.remove("col-6")
        rigthSide.classList.remove("col-6")
        leftSide.classList.add("col-4")
        rigthSide.classList.add("col-4")    
    }
    
})


