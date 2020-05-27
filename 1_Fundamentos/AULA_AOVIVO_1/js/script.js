let globalFrequencyLabel;
let globalFrequencyRange;
let globalDivPodcast;

window.addEventListener("load", () => {
  globalFrequencyLabel = document.querySelector("#inputFrequency");
  globalFrequencyRange = document.querySelector("#inputRange");
  globalDivPodcast = document.querySelector("#podcastInfo");

  globalFrequencyRange.addEventListener("change", handleRangeChange);
  render(globalFrequencyLabel.value);
});

function handleRangeChange(event) {
  let rangeValue = event.target.value;
  if (rangeValue.length === 2) {
    rangeValue += ".0";
  }

  globalFrequencyLabel.value = rangeValue;
  render(globalFrequencyLabel.value);
}

function render(currFrequency) {
  let currPodcast = podcasts.find((podcast) => {
    return podcast.id == currFrequency;
  });

  if (!currPodcast) {
    let txtPodcast = document.createElement("p");
    txtPodcast.textContent = "Não há Podcasts nessa frequência.";
    txtPodcast.classList.add("noPodcast");
    globalDivPodcast.innerHTML = "";
    globalDivPodcast.appendChild(txtPodcast);
    return;
  }
  let titlePodcastHeader = document.createElement("h2");
  titlePodcastHeader.textContent = currPodcast.title;

  let imgPodcast = document.createElement("img");
  imgPodcast.setAttribute("src", `./src/img/${currPodcast.img}`);
  imgPodcast.setAttribute("alt", currPodcast.imgAlt);

  let txtPodcast = document.createElement("p");
  txtPodcast.textContent = currPodcast.description;

  globalDivPodcast.innerHTML = "";
  globalDivPodcast.appendChild(titlePodcastHeader);
  globalDivPodcast.appendChild(imgPodcast);
  globalDivPodcast.appendChild(txtPodcast);
}

function testFreq() {
  globalFrequencyRange.value = "89.1";
  globalFrequencyLabel.value = "89.1";
  render();
}
