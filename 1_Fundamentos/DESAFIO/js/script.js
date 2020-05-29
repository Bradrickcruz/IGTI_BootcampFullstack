/**regras do programa

- elemento de aguarde quando carregando os dados
	o input deve estar bloqueado durante esse processo

- se no input houver mais de um caracter, o botao de busca se habilita
- o usuario pode buscar tanto pelo botao quanto apertando enter
 */

let userData = null;
window.addEventListener('load', () => {
  console.log('loaded');
  fetchingData();
});

async function fetchingData() {
  userData = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  userData = await userData.json();
  userData = [...userData.results];
  userData = userData.map((user) => {
    return {
      name: user.name,
      gender: user.gender,
      age: user.dob.age,
      thumb: user.picture.thumbnail,
    };
  });
  console.log(userData);
}
