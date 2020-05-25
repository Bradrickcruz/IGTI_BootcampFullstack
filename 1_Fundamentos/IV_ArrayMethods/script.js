/**PRINCIPAIS METODOS DE ARRAYS EM ES6+
 * map      - gera um novo array transformando os dados
 * filter   - gera um novo array filtrando os dados
 * forEach  - percorre todos os dados, alterando-os
 * reduce   - realiza um calculo em sequencia com todos os itens
 * find     - retorna o primeiro item a corresponder a uma logica
 * some     - retorna booleano com base em se algum item atende a uma logica
 * every    - retorna booleano com base em se todos os itens atendem a uma logica
 * sort     - ordena os itens
*/

window.addEventListener("load",()=>{
    console.log(people);

    doMap();
    doFilter();
    doForEach();
    doReduce();
    doFind();
    doSome();
    doEvery();
    doSort();

})


function doMap(){
    const nameEmailPeople = people.results.map( person => {
        return {
            name: person.name,
            email: person.email
        }
    })

    // console.log(nameEmailPeople)
    return nameEmailPeople
}

function doFilter(){
    const olderThan18 = people.results.filter( person => {
        return person.dob.age >= 18
        // return person.gender == "male"
    })
    
    // console.log(olderThan18)
    return olderThan18
}

function doForEach(){
    const mappedPeople = doMap();
    mappedPeople.forEach(person => {
        person.nameSize = `${person.name.title}${person.name.first}${person.name.last}`.length;
    });
    
    // console.log(mappedPeople);
    return mappedPeople;
}

function doReduce(){
    const totalAges = people.results.reduce((accumulator ,current) => {
        return accumulator + current.dob.age;
    }, 0)
    
    // console.log(totalAges);
    return totalAges
}

function doFind(){
    const found = people.results.find(person => {
        return person.location.state === "Minas Gerais";
    })

    // console.log(firstMineiro);
    return found;
}

function doSome(){
    const hasGaucho = people.results.some(person => {
        return person.location.state === "Rio Grande do Sul";
    })
    
    console.log(hasGaucho);
    return hasGaucho;
}

function doEvery(){
    const allBrazilian = people.results.every(person => {
        return person.nat === "BR";
    })

    console.log(allBrazilian);
    return allBrazilian;
}
function doSort(){
    // const names = doMap().map(person => (person.name.first)).sort()
    const names = people.results.map(person => {
        return {
            name: person.name.first,
            nameSize: person.name.first.length
        }
    })
    .filter(person => person.name.startsWith("A"))
    .sort((currPerson, nextPerson) => {
        // return currPerson.name.localeCompare(nextPerson.name) //isso compara e ordena os nomes em si
        // return currPerson.nameSize - nextPerson.nameSize // isso compara e ordena pelo tamanho dos nomes
    })

    console.log(names);
}
