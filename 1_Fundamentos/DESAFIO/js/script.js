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
  globalUsersFetched = [...usersData];
}

let globalUsersFetched = null;
fetchingData();
let globalUsersFoundedList = [];

let globalInputSearch = null;
let globalInputSearchSubmit = null;
let globalDivUserFounded = null;
let globalDivUserFoundedStats = null;

globalInputSearch = document.querySelector('#inputSearch');
globalInputSearchSubmit = document.querySelector('#inputSearchSubmit');
globalDivUserFounded = document.querySelector('#usersFoundedList');
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
    globalDivUserFounded.innerHTML = '';
    if (globalUsersFoundedList.length > 0) {
      // finding some user
      console.log('some user was found');
      let title = document.createElement('h2');
      title.textContent = `${globalUsersFoundedList.length} users founded`;

      let userList = document.createElement('ul');
      userList.classList.add('userList');

      globalUsersFoundedList.forEach((user) => {
        let userItem = `
        <li class="userInfo">
          <img src=${user.thumb} alt="Profile user thumbnail">
          <div class="info">
            <span class="userName">${user.name}</span>
            <span class="userAge">${user.age} years old</span>
          </div>
        </li>
        `;
        userList.innerHTML += userItem;
      });
      globalDivUserFounded.appendChild(title);
      globalDivUserFounded.appendChild(userList);
      return;
    }
    // else
    globalDivUserFounded.innerHTML = `
    <h2>No users Founded</h2>
    `;
  }
  function updateUserFoundedStats() {
    function countMaleUsers() {
      let count = 0;
      globalUsersFoundedList.forEach((user) => {
        user.gender === 'male' ? count++ : (count += 0);
      });
      return count;
    }
    function countFemaleUsers() {
      let count = 0;
      globalUsersFoundedList.forEach((user) => {
        user.gender === 'female' ? count++ : (count += 0);
      });
      return count;
    }
    function sumUserAges() {
      // let sum = 0;
      let sum = globalUsersFoundedList.reduce((acc, { age }) => {
        return acc + age;
      }, 0);
      console.log(sum);
      return sum;
    }
    function avgUserAges() {
      return sumUserAges() / globalUsersFoundedList.length;
    }
    globalDivUserFoundedStats.innerHTML = '';
    if (globalUsersFoundedList.length > 0) {
      // finding some user
      globalDivUserFoundedStats.innerHTML = `
        <h2>Statistics</h2>
        <div class="statsInfo">
          <span class="maleUsersFoundedCount">male count: ${countMaleUsers()}</span>
          <span class="femaleUsersFoundedCount">female count: ${countFemaleUsers()}</span>
          <span class="sumAgesFounded">sum of ages founded: ${sumUserAges()}</span>
          <span class="avgAgesFounded">average os ages founded: ${avgUserAges()}</span>
        </div>
      `;

      // let title = document.createElement('h2');
      // title.textContent = 'Statistics';

      // let divStatsInfo = document.createElement('div');
      // divStatsInfo.classList.add('statsInfo');

      return;
    }
    // else
    globalDivUserFoundedStats.innerHTML = `
    <h2>Statistics</h2>
    `;
  }

  updateUserFoundedList();
  updateUserFoundedStats();
}

function searchUsers() {
  let searchFor = globalInputSearch.value.toLowerCase();
  // console.log(searchFor);
  // console.log(globalUsersFetched);
  globalUsersFoundedList = [
    ...globalUsersFetched.filter(({ name }) => {
      let match = new Boolean(name.toLowerCase().match(searchFor));
      return match.valueOf();
    }),
  ];
  console.log(globalUsersFoundedList);
  render();
}
