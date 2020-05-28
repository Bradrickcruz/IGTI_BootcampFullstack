// o fetch retorna uma promise de uma requisição para um site/API
// usamos o metodo then() para dar seguimento no codigo SE tudo correr bem
//recebe uma callback e envia o "resolve"
// usamos o metodo catch() para dar seguimento no codigo SE algum erro ocorrer
// recebe uma callback e envia o "reject"

const userURL = "https://api.github.com/users/Bradrickcruz";
let userData;
const githubInfo = fetch(userURL)
  .then((response) => {
    response
      .json()
      .then((data) => {
        console.log(data);
        let h1User = document.createElement("h1");
        h1User.textContent = `${data.login} - ${data.name}`;
        document.body.appendChild(h1User);
      })
      .catch((reject) => {
        return;
      });
  })
  .catch((reject) => {
    return;
  });

const require = fetch("https://api.github.com/users/Bradrickcruz");

async function getGithubData(fetch) {
  function getUserLogin(data) {}

  function getUserName(data) {}

  let login = await getUserLogin(data);
  let name = await getUserName(data);

  return { login, name };
}

async function divisionPromise(a, b) {
  // return a/b;
  let division = await new Promise((resolve, reject) => {
    if (b === 0) {
      reject("ERRO: divisão por zero");
    }
    resolve(a / b);
  });
  // console.log(division)
  return division;
}

let result;
divisionPromise(5, 6)
  .then((resolve) => {
    // console.log(res);
    result = resolve;
    // return res
  })
  .catch((reject) => {
    result = reject;
    // return err
  });

  fetch('').then((res)=>{
    res.text()
  })