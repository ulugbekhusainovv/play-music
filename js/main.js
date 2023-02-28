const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const audios = document.getElementById("audio");
const menu = document.querySelector(".menu");
const bars = document.getElementById("bars");
const exit = document.getElementById("exit");
const [start, end] = document.querySelector(".time").children;
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const souondVolume = document.getElementById("souond_volume");

souondVolume.style.opacity = "0";
// ul
const musicList = document.getElementById("music-list");
cover.style.animationPlayState = "paused";

bars.addEventListener("click", () => {
  menu.style.opacity = "1";
  menu.style.zIndex = "10";
  menu.style.height = "50%";
});
exit.addEventListener("click", () => {
  menu.style.opacity = "0";
  menu.style.zIndex = "-1";
  menu.style.height = "0";
});
let isPlayying = false;
let index = 0;
let interval;
const songs = [
  "Billie Eilish - Lovely",
  "Heather - Conan Gray",
  "Orxan - Unutmak Istiyorum",
  "Rauf Faik - метро",
];
const musicInterval = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    timeFormatter();
  }, 1000);
};
const timeFormatter = () => {
  start.textContent =
    parseInt(audio.currentTime / 60) + ":" + parseInt(audio.currentTime % 60);
  end.textContent =
    parseInt(audio.duration / 60) + ":" + parseInt(audio.duration % 60);
  progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  if (audio.currentTime == audio.duration) {
    nextMusic();
  }
  if (audio.currentTime >= 60) {
    start.textContent =
      parseInt(audio.currentTime / 60) + ":" + parseInt(audio.currentTime % 60);
  } else if (audio.currentTime >= 0) {
    let audioRound = Math.floor(audio.currentTime);
    start.textContent = `00:${audioRound < 10 ? "0" + audioRound : audioRound}`;
  }
};
loadSong(index);
function loadSong(i) {
  title.textContent = songs[i];
  cover.src = `img/${songs[i]}.jpg`;
  audios.src = `musics/${songs[i]}.mp3`;
}
function nextMusic() {
  index++;
  if (index == songs.length) {
    index = 0;
  }
  loadSong(index);
  isPlayying = true;
  audio.play();
  musicInterval();
  cover.style.animationPlayState = "inherit";
  volumeMusic();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}
function prevMusic() {
  index--;
  if (index < 0) {
    index = songs.length - 1;
  }
  loadSong(index);
  isPlayying = true;
  volumeMusic();
  musicInterval();
  cover.style.animationPlayState = "inherit";
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}
function playMusic() {
  if (!isPlayying) {
    audio.play();
    musicInterval();
    cover.style.animationPlayState = "inherit";
    volumeMusic();
    isPlayying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    audio.pause();
    // audio.currentTime = 0;
    isPlayying = false;
    cover.style.animationPlayState = "paused";
    // clearInterval(interval);
    playBtn.innerHTML = `<i class="fas fas fa-play"></i>`;
  }
}

// function proggress(e) {
//   audio.currentTime = e.layerX
// console.log(e.layerX);
// }

nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);
playBtn.addEventListener("click", playMusic);
// progress.addEventListener('input', proggress)
// progress.parentElement.addEventListener("click", (e) => {
//   audio.currentTime = Math.floor(e.offsetX);
//   console.log(e.layerX);
//   console.log(audio.duration);
//   console.log(e); //timeline
//   // :
//   // DocumentTimeline {currentTime: 84118.969}

// });

songs.forEach((music) => {
  musicList.innerHTML += `
  <li class="item">${music}</li>
  `;
});
musicList.addEventListener("click", (e) => {
  let musicItem = e.target.textContent;
  // console.log(e.target.textContent);
  musicInterval();
  cover.style.animationPlayState = "inherit";
  if (musicItem == songs[0]) {
    index = 0;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else if (musicItem == songs[1]) {
    index = 1;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else if (musicItem == songs[2]) {
    index = 2;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else if (musicItem == songs[3]) {
    index = 3;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
});
volume.addEventListener("input", () => {
  volumeMusic();
  souondVolume.textContent = volume.value;
  if (volume.value <= 70) {
    souondVolume.style.color = "#83f80d";
  } else if (volume.value == 100) {
    setTimeout(() => {
      let sorov = confirm(
        "ovoz juda baland bu eshitish qobilyatingizga yomon ta'sir ko'rsatishi mumkin musiqa ovozini paslatishni istaysimi 🎧😊"
      );
      if (sorov) {
        volume.value = 50;
      } else {
        volumeMusic();
      }
    }, 1000);
  } else if (volume.value > 70) {
    souondVolume.style.color = "#f80d0d";
  }
  souondVolume.style.opacity = "1";
  setTimeout(() => {
    souondVolume.style.opacity = "0";
  }, 3000);
});
function volumeMusic() {
  if (volume.value == 100) {
    audio.volume = `${1}`;
  } else if (volume.value < 10) {
    audio.volume = `0.0${volume.value}`;
  } else if (volume.value < 100) {
    audio.volume = `0.${volume.value}`;
  }
}
