const clickArray = [];
window.addEventListener('load', () => {
  console.log('DOM carregado');

  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick() {
  const item = getTimeStamp();
  clickArray.push(item);
  render(item);
}

function render(item) {
  const ul = document.querySelector('#data');

  let li = document.createElement('li');
  li.textContent = item;
  ul.appendChild(li);

  document.title = clickArray.length;
}
