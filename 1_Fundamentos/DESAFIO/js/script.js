async function fetchingData() {
  usersData = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  usersData = await usersData.json();
  usersData = [...usersData.results];
  usersData = usersData.map((user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender,
      age: user.dob.age,
      thumb: user.picture.thumbnail,
    };
  });
  // console.log(usersData);
  return usersData;
}

let UsersFetched = fetchingData();
let usersFoundedList = [];

let globalInputSearch = null;
let globalInputSearchSubmit = null;
let globalDivUserFounded = null;
let globalDivUserFoundedStats = null;

globalInputSearch = document.querySelector('#inputSearch');
globalInputSearchSubmit = document.querySelector('#inputSearchSubmit');
globalDivUserFounded = document.querySelector('#userFoundedList');
globalDivUserFoundedStats = document.querySelector('#usersFoundedStats');

globalInputSearch.addEventListener('keyup', (event) => {
  // console.log(event);
  if (event.target.value.length >= 1) {
    globalInputSearchSubmit.disabled = false;
    if (event.key === 'Enter') {
      searchUsers();
    }
    return;
  }
  globalInputSearchSubmit.disabled = true;
});
globalInputSearchSubmit.addEventListener('click', searchUsers);

render();

function render() {
  function updateUserFoundedList() {
    if (usersFoundedList) {
      // finding some user
      return;
    }
    // else
  }
  function updateUserFoundedStats() {
    if (usersFoundedList) {
      // finding some user
      return;
    }
    // else
  }

  updateUserFoundedList();
  updateUserFoundedStats();
}

function searchUsers() {
  console.log('Submiting...');
  let searchFor = globalInputSearch.value;
  console.log(searchFor);
}
