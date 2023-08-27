const axios = require('axios')

//constante con la url de la api
const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=50"

//funcion asincrona para llamar a la api

async function getCharacters () {
    try{
        const response = await axios.get(pokeUrl)
        const pokemones =response.data.results
        console.log(pokemones)

        pokemones.forEach(pokemon =>{
            const data = pokemon.url
            getInfo()

            async function getInfo (){
                try{
                    const responseDos = await axios.get(data)
                    const abilitiePoke = [responseDos.data] 
                    //console.log(abilitiePoke)
                    abilitiePoke.forEach(dato =>{
                        console.log(dato.name)
                        const abilities = dato.abilities
                        abilities.forEach(abi =>{
                            console.log(`--${abi.ability.name}`)
                        })
                    })
                    
                }catch(error){
                    console.log(error)
                }
            }
            
        })

    }catch(error){
        console.log(`El error es ${error}`)
    }
}

getCharacters()