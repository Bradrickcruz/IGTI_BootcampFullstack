window.addEventListener('load', () => {
  render();
  var tableObj = document.querySelector('table');
  tableObj.addEventListener('change', () => {
    render();
  });
  // setInterval(render,40) <-- mais rápido
});

function render() {
  function setColor(r, g, b) {
    //retorna a cor configurada na pagina
    let square = document.querySelector('#colorfulSquare');
    square.style.backgroundColor = `rgb(${r},${g},${b})`;
  }

  let [rInput, gInput, bInput] = Array.from(
    document.querySelectorAll("input[type='text']")
  );
  let [rRange, gRange, bRange] = Array.from(
    document.querySelectorAll("input[type='range']")
  );

  rInput.value = rRange.value;
  gInput.value = gRange.value;
  bInput.value = bRange.value;

  setColor(rInput.value, gInput.value, bInput.value);
}
