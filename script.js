const musicContainer = document.querySelector('.music-container');
const title = document.querySelector('#title');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const audio = document.querySelector('#audio');
const cover = document.querySelector('#cover');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

// Titres de chansons
const chansons = ['coccaina remix', 'Munar ft Albin Hasani - Taking Back',
 'Plada - World Hold On', 'Miscris Meqq - angels', 'Jony - Madame remix',
 'Marc Benjamin Moonway -Lovin You', 'La la la remix', 'Love Your Voice', 'One Dance remix',
 'Грустный Танец', 'Deepierro Nalyro - Dont Speak', 'Молод и Глуб remix',
 'Noize Generation - Till The Morning', 'Wthd - Me Up', 'Lonelysoul - Human',
 'Esound Fyex - Childhood', 'Olivia Addams - Are We There',
 'Steff Da Campo x Chico Rose - 5 On It', 'Embro - I Got This', 'Inna - Flashbacks', 
 'Abro - For The Night', 'Ислам Италиев - На Нервах', 'Ислам Италиев - Она любимия', 
 'Ислам Италиев - Сердце не ревнуй'
];

// Suivre des chansons
let chansonIndex = 0;

// Téléchatrger des informations sur la chancon
loadSong(chansons[chansonIndex]);

// Mettre à jour les détails de la chanson
function loadSong(chanson) {
  title.innerText = chanson
  audio.src = `music/${chanson}.mp3`
  cover.src = `images/${chanson}.jpg`
}

// Button play
function playChanson() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

// Button précédente
function prevChanson() {
  chansonIndex--

  if (chansonIndex < 0) {
    chansonIndex = chansons.length - 1
  }
  loadSong(chansons[chansonIndex])
  playChanson()
}

// Button suivant
function nextChanson() {
  chansonIndex++

  if (chansonIndex > chansons.length - 1) {
    chansonIndex = 0
  }
  loadSong(chansons[chansonIndex])
  playChanson()
}

// Button pause
function pauseChanson() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

// Progression de la mise à jour
function updateProgress(e) {
  // Créer la const pour la durée et minute actuelle
  const {duration, currentTime} = e.srcElement
  const progressPourcentage = (currentTime / duration) * 100

  // Définir la largeur de progression
  progress.style.width = `${progressPourcentage}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const durer = audio.duration
  audio.currentTime = (clickX / width) * durer
}

// Auditeurs d'événements
playBtn.addEventListener('click', () => {
  // On va vérifier si la chanson joue ou pas
  const enTrainDeJouer = musicContainer.classList.contains('play')

  if (enTrainDeJouer) {
    pauseChanson()
  } else {
    playChanson()
  }
})


// Changer la music
prevBtn.addEventListener('click', prevChanson)
nextBtn.addEventListener('click', nextChanson)

// Mettre à jour la musique
audio.addEventListener('timeupdate', updateProgress)

// Rembobiner la musique
progressContainer.addEventListener('click', setProgress)

// A la fin la chanson change systématiquement
audio.addEventListener('ended', nextChanson)