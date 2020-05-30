let globalUsers = null,
    globalCountries = null,
    globalUserCountries = null;

function start() {
  console.log('dom carregado');
  await fetchUsers();
  await fetchCountries();

  hideSpinner();
  mergeUsersCountries();
  render();
}

async function fetchUsers(){
  const res = await fetch("https://ramdomuser.me/api/?results=100&seed=promise&nat=us,fr,au,br");
  const json = await res.json()
  
}

function mergeUsersCountries(){
  globalUsers.forEach(user => {
    const foundCountry = globalCountries.find(country => {
      return user.userCountry === country.countryCode;
    });
    globalUserCountries.push({...user,...foundCountry});
  });
}
start();
