//funcion para obtener informacion al hacer click boton stats
function displayStatsPoke (info) {
      const stats = info.stats
      const statsPoke = document.createElement("p")
      let statpokemon = "";
      console.log(stats)
      stats.forEach(ele =>{
        const stat = ele.base_stat
        const statName = ele.stat.name
        // console.log(stat, statName)
            statpokemon = `${statpokemon} ${statName} -- ${stat}<br>`
            statsPoke.innerHTML = `${statpokemon}`
            statsPoke.classList.add("content-p")
            contentInfo.appendChild(statsPoke)
      })
      btnStats.innerHTML= `Stats`
}