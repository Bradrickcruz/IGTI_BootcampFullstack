var globalNames = ["Bryan", "Gabriela", "Hector", "Melany", "Johnny"];
var inputName = null
var isEditing = false
var curIndex = null

window.addEventListener("load",()=>{
    inputName = document.querySelector("#inputName");
    
    preventFormSubmit();
    startInput();
    render()
})

function preventFormSubmit(){
    var form = document.querySelector("form");
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
    })
}


function startInput(){
    function insertName(newName){
        globalNames.push(newName);
        render()
    }

function updateName(newName){
    globalNames[curIndex] = newName
    render();
}

    function handleTyping(event) {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            if (isEditing){
                updateName(event.target.value);
            }else{
                insertName(event.target.value);
            }
            isEditing = false;
            clearInput();
        }
    }

    inputName.addEventListener("keyup",handleTyping);
    inputName.focus();
}

function render() {
    function createDeleteButton(i){
        let button = document.createElement("button");
        button.textContent = "X"
        button.classList.add("deleteButton")

        button. addEventListener("click",()=>{
            globalNames.splice(i,1);
            render()
        })
        return button
    }

    function createSpan(name,index){
        let span = document.createElement("span");
        span.classList.add("clickable");
        span.textContent = name

        span.addEventListener("click",function(){
            inputName.value = name
            inputName.focus();
            isEditing = true;
            curIndex = index;
        })

        return span
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = "";
    // criar ul
    let ul = document.createElement("ul");
    
    // fazer n li's, conforme tamanho do globalNames
    for (let i = 0; i< globalNames.length; i++) {
        let curName = globalNames[i];
        let li = document.createElement("li")
        
        let button = createDeleteButton(i);

        let span = createSpan(curName,i)

        li.appendChild(button)
        li.appendChild(span)
        ul.appendChild(li)
    }

    divNames.appendChild(ul)
    clearInput();
}

function clearInput() {
    inputName.value = "";
    inputName.focus();
}