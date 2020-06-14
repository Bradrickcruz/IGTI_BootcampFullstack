const clickArray = [];
window.addEventListener('load', () => {
  console.log('DOM carregado');

  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick() {
  clickArray.push(getTimeStamp());
  render();
}

function render() {
  const ul = document.querySelector('#data');
  ul.innerHTML = '';

  let listHTML = '';
  clickArray.map((item) => {
    listHTML += `<li>${item}</li>`;
  });
  ul.innerHTML = listHTML;

  document.title = clickArray.length;
}
