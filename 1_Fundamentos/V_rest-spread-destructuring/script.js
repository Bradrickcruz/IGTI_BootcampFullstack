window.addEventListener("load",()=>{
    
    doSpread();
    doRest();
    doDestructuring();
})

function doSpread(){
    const marriedMen = people.results.filter(person => (person.name.title == "Mr"));
    const marriedWomen = people.results.filter(person => (person.name.title == "Ms"));

    const marriedPeople = {
        results: [
            ...marriedMen,  //adiciona todos os itens do marriedMen no results
            ...marriedWomen //adiciona todos os itens do marriedWomen no results
        ]
    }

    // console.log(marriedPeople);
    // return marriedPeople;
}

function doRest(){
    function infiniteSum(...numbers){
        // console.log(numbers); // torna numbers um array

        return numbers.reduce((accu, curr) => {
            return accu + curr;
        },0)
    }
    
    // console.log(infiniteSum(1,1,321,54698,31,684,521,5)); // pode ter quantos parametros quizer
    // console.log(infiniteSum(14,1342,1,698,31,64,51,5));
}

function doDestructuring(){
    const loginInfo = people.results.map(person => {
        return {
            username: person.login.username,
            password: person.login.password
        }
    })
    
    const { username, password } = loginInfo[0]; 
    // as variaveis tem que ter o mesmo nome que o atributo
    return { username, password }
}