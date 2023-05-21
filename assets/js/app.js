// Global Variables
const background = document.querySelector(".background img");
const thumbnail = document.querySelector("#thumbnail");
const songNameElement = document.querySelector(".title__song");
const artistNameElement = document.querySelector(".artist__name");
const songDurationElement = document.querySelector(".duration");
const currentTimeElement = document.querySelector(".current__time");
const previousBtnElement = document.querySelector("#previous");
const nextBtnElement = document.querySelector("#next");
const playBtnElement = document.querySelector("#play");
const progressBarElement = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__bar");
const randomly = document.querySelector("#random");
const repeatBtnElement = document.querySelector("#repeat");
const song = new Audio();
let isPlaying = false;
let repeating = false;
let index = 0;
const songsList = [
  {
    id: 1,
    title: "Despacito",
    Artist: "Daddy yankee",
    thumbnail: "../assets/img/despacito.jpeg",
  },
  {
    id: 2,
    title: "Cafuné",
    Artist: "Micro tdh",
    thumbnail: "../assets/img/cafuné.jpeg",
  },
  {
    id: 3,
    title: "Somos de Calle",
    Artist: "Daddy yankee",
    thumbnail: "../assets/img/de-calle.jpeg",
  },
  {
    id: 4,
    title: "El Cigarrillo",
    Artist: "Ana Gabriel",
    thumbnail: "",
  },
  {
    id: 5,
    title: "Hasta que el cuerpo aguante",
    Artist: "Mægo de Oz",
    thumbnail: "",
  },
  {
    id: 6,
    title: "La Playa",
    Artist: "Mike towers",
    thumbnail: "",
  },
  {
    id: 7,
    title: "Sensualidad",
    Artist: "Bad Bunny",
    thumbnail: "",
  },
];

/**
 * / toggle music (Play or Pause)
 */
function togglePlayMusic() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

/**
 * /Start music
 */
function playMusic() {
  isPlaying = true;
  playBtnElement.classList.replace("uil-play", "uil-pause");
  playBtnElement.setAttribute("title", "Pause");
  song.play();
}

/**
 *  / Pause playback
 */
function pauseMusic() {
  isPlaying = false;
  playBtnElement.classList.replace("uil-pause", "uil-play");
  playBtnElement.setAttribute("title", "Play");
  song.pause();
}

/**
 * // load the song from the specified object
 * @param {object} music
 */
function loadMusic(music) {
  song.src = `../assets/music/${music.title}.mp3`;
  thumbnail.src = music.thumbnail === "" ? '../assets/img/default.jpeg' : music.thumbnail;
  background.src = music.thumbnail === "" ? '../assets/img/default.jpeg' : music.thumbnail;
  songNameElement.textContent = music.title;
  artistNameElement.textContent = music.Artist;
}

/**
 * // Change the current playback
 * @param {number} direction
 */
function changeMusic(direction) {
  index = (index + direction + songsList.length) % songsList.length;
  loadMusic(songsList[index]);
  playMusic();
}

function playMusicRandomly() {
  const randomMusic = songsList.sort(() => (Math.random() >= 0.5 ? -1 : 1));
  let randomIndex = Math.floor(Math.random() * (songsList.length - index));
  if (!randomMusic[randomIndex].title === songsList[index].title) {
    loadMusic(songsList[randomIndex]);
  } else {
    loadMusic(randomMusic[index]);
  }
  playMusic();
}

function repeatSong() {
  repeating = !repeating;
  if(repeating) {
    repeatBtnElement.setAttribute('title', 'Cancel Repeat');
  } else {
    repeatBtnElement.setAttribute('title', 'Repeat');
  }
}

/**
 * Updates the width of bar element with the current time of playback
 */
function updateProgressBar() {
  const { duration, currentTime } = song;
  const progress = (currentTime / duration) * 100;
  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  currentTimeElement.textContent = `${Math.floor(
    currentTime / 60
  )}:${formatTime(currentTime % 60)}`;
  if (!isNaN(song.duration)) {
    progressBarElement.style.width = `${progress}%`;
    songDurationElement.textContent = `${Math.floor(
      duration / 60
    )}:${formatTime(duration % 60)}`;
  } else {
    songDurationElement.textContent = `0:00`;
  }
}

/**
 * Set the current time of the current playback
 * @param {*} e
 */
function setProgress(e) {
  let width = e.target.offsetWidth;
  let clickX = e.offsetX;
  song.currentTime = (clickX / width) * song.duration;
}
// call functions
loadMusic(songsList[index]);
playBtnElement.addEventListener("click", togglePlayMusic);
repeatBtnElement.addEventListener("click", repeatSong);
nextBtnElement.addEventListener("click", () => changeMusic(1));
previousBtnElement.addEventListener("click", () => changeMusic(-1));
progressBar.addEventListener("click", setProgress);
randomly.addEventListener("click", playMusicRandomly);
song.addEventListener("timeupdate", updateProgressBar);
song.addEventListener("ended", () => {
  if(repeating) {
    playMusic();
  } else {
    changeMusic(1);
  }
});
