const video = document.querySelector('.video');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.querySelector('.progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const muteUnmuteBtn = document.getElementById('mute-unmute');
const fullscreenBtn = document.getElementById('fullscreen');
const videoContainer = document.querySelector('.video-container');

// Play/Pause
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    video.pause();
    playPauseBtn.textContent = '▶️';
  }
});

// Update progress bar and time
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTimeDisplay.textContent = formatTime(video.currentTime);
});

// Update duration once metadata is loaded
video.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(video.duration);
});

// Seek functionality
progressBarContainer.addEventListener('click', (e) => {
  const newTime = (e.offsetX / progressBarContainer.offsetWidth) * video.duration;
  video.currentTime = newTime;
});

// Volume control
volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
  muteUnmuteBtn.textContent = video.volume > 0 ? '🔊' : '🔇';
});

// Mute/Unmute
muteUnmuteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  muteUnmuteBtn.textContent = video.muted ? '🔇' : '🔊';
  volumeSlider.value = video.muted ? 0 : video.volume;
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) { // Firefox
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) { // IE/Edge
    videoContainer.msRequestFullscreen();
  }
});

// Helper function to format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

