var input = document.querySelector("#input1")

input.value = "Bryan Cruz"

/**
 * aprendendo sobre enventos
*/

window.addEventListener("load",()=>{
    console.log("contador de caracteres no input")
    
    input.addEventListener("keyup",(event)=>{
        let count = event.target.value
        var span = document.querySelector("#contador")
        span.textContent = "Contador de caracteres: " + count.length
    })

})