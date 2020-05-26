window.addEventListener("load", () => {
  let seconds = 0;
  const timer = document.querySelector("#timer");
  var timeInterval = setInterval(() => {
    timer.textContent = ++seconds;

    if (seconds === 10) {
      clearInterval(timeInterval);
      return 0;
    }

    if (seconds % 5 === 0) {
      setTimeout(() => {
        timer.textContent = seconds += 0.5;
        seconds -= 0.5;
      }, 500);
    }
  }, 1000);
});
