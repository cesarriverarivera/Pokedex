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
const btnStats = document.querySelector("#btn-stats");

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


//funcion para limpiar pokedex
function limpiador () {
    imagePoke.innerHTML=""; //limpia el cuadro de la imagen
    pokemonName.innerHTML=""; //limpia el nombre del pokemon
    contentInfo.innerHTML=""; //limpia el contenido de tipo y habilidades
    baseExperience.innerHTML="";//limpia el contenido de experiencia
    weigth.innerHTML=  ""; //limpia el contenido de peso
    btnChangeInfo.innerHTML=`<img src="/assets/images/ataque.png">`; //limpia boton de movimientos
    btnChangeInfo.classList.remove("cambiar-color"); //quita clase para estilar boton de movimientos
    btnStats.classList.remove("cambiar-color"); //quita clase para estilar boton de stats
    btnStats.innerHTML=`<img src="/assets/images/stats.png">`//limpia boton de stats
}


let info = ""; //variable para almacenar informacion extraida de la api
function obtenerInfoPokemon (nombre){
    limpiador() //resetea los valores
    fetch(`${pokeUrlInfo}/${nombre}`)
    .then(response => response.json())
    .then(data =>{
        info = data;
        displayInfoPokemon(info) //muestra la info basica en display
        console.log(data) 
    })
}



//evento para mostar info de movements de pokemon
btnChangeInfo.addEventListener("click", btnMovement)
//evento para mostar info de stats de pokemon
btnStats.addEventListener("click", btnStat)



//funcion para el boton movimientos
let btnClikeado = false;
function btnMovement () {
    if(btnClikeado == false){
        contentInfo.innerHTML= "";
        btnChangeInfo.classList.add("cambiar-color")
        displayMoreInfoPokemon(info);
        btnClikeado =true
    } else {
        limpiador()
        displayInfoPokemon(info)
        btnClikeado = false
    }
}

//funcion para el boton stats
function btnStat() {
    if(btnClikeado == false){
        contentInfo.innerHTML="";
        btnStats.classList.add("cambiar-color")
        displayStatsPoke(info);
        btnClikeado =true
    }else{
        limpiador()
        displayInfoPokemon(info)
        btnClikeado = false
    }
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
    //qintando clase que aumenta y encoge al circulo antes de darle click
    btnBuscar.classList.remove("btn-busqueda-aumentar")
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

    const pokeWeigth = info.weight  //ubicacion de peso pokemon
    const weigthPoke = document.createElement("p")
    weigthPoke.innerHTML= `Peso: ${pokeWeigth}`
    weigth.appendChild(weigthPoke)

}



//listener para quitar la clase que anima el select
selectList.addEventListener("click",()=>{
    selectList.classList.remove("intensificar")
    btnBuscar.classList.add("btn-busqueda-aumentar")
})

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
    btnStats.innerHTML=`
    <img src="/assets/images/stats.png">
    `
    selectList.classList.add("intensificar") //agrega clase para animar select
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


