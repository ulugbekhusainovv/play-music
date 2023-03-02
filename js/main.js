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
musicInterval();
const timeFormatter = () => {
  let duration = audio.duration;
  let currTime = audio.currentTime;
  progress.style.width = (currTime / duration) * 100 + "%";

  let endMinutes = parseInt(duration / 60);
  let endSecundes = parseInt(duration % 60);

  end.textContent = `${endMinutes}:${(endSecundes =
    endSecundes < 10 ? "0" + endSecundes : endSecundes)}`;
  if (currTime == duration) {
    nextMusic();
    musicInterval();
  }
  let startMinutes = parseInt(currTime / 60);
  let startSecund = parseInt(currTime % 60);
  start.textContent = `${(startMinutes =
    startMinutes < 10 ? "0" + startMinutes : startMinutes)}:${(startSecund =
    startSecund < 10 ? "0" + startSecund : startSecund)}`;
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
  playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"><i class="fa-solid fa-pause"></i></abbr>`;
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
  playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"><i class="fa-solid fa-pause"></i></abbr>`;
}
function playMusic() {
  if (!isPlayying) {
    audio.play();
    musicInterval();
    cover.style.animationPlayState = "inherit";
    volumeMusic();
    isPlayying = true;
    playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"><i class="fa-solid fa-pause"></i></abbr>`;
  } else {
    audio.pause();
    isPlayying = false;
    cover.style.animationPlayState = "paused";
    playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"
    ><i class="fas fas fa-play"></i
  ></abbr>`;
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
  musicInterval();
  cover.style.animationPlayState = "inherit";
  if (musicItem == songs[0]) {
    index = 0;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"><i class="fa-solid fa-pause"></i></abbr>`;
  } else if (musicItem == songs[1]) {
    index = 1;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"><i class="fa-solid fa-pause"></i></abbr>`;
  } else if (musicItem == songs[2]) {
    index = 2;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"><i class="fa-solid fa-pause"></i></abbr>`;
  } else if (musicItem == songs[3]) {
    index = 3;
    loadSong(index);
    audio.play();
    isPlayying = true;
    playBtn.innerHTML = `<abbr style="cursor: pointer; border: none" title="Space"><i class="fa-solid fa-pause"></i></abbr>`; //
  }
}); //
volume.addEventListener("input", () => {
  setVolume();
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
window.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    playMusic();
  } else if (e.key === "ArrowRight") {
    nextMusic();
  } else if (e.key === "ArrowLeft") {
    prevMusic();
  } else if (e.key === "ArrowUp") {
    volume.value++;
    setVolume();
  } else if (e.key === "ArrowDown") {
    volume.value--;
    setVolume();
  } else if (e.key === "Control") {
    menu.style.opacity = "1";
    menu.style.zIndex = "10";
    menu.style.height = "50%";
  } else if (e.key === "Backspace") {
    menu.style.opacity = "0";
    menu.style.zIndex = "-1";
    menu.style.height = "0";
  }
});
function setVolume() {
  volumeMusic();
  souondVolume.textContent = volume.value;
  if (volume.value == 0) {
    let mute = confirm("ovozsiz rejim yonsinmi !");
    if (mute) {
      volumeMusic();
      setTimeout(() => {
        alert("ovozsiz rejimga o'tildi");
      }, 3000);
    } else {
      volume.value = 20;
      volumeMusic();
    }
  } else if (volume.value <= 70) {
    souondVolume.style.color = "#83f80d";
  } else if (volume.value == 99) {
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
}
