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