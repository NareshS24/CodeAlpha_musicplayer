const playlist = [
    {
        url: "music/Vazhithunaiye.mp3",
        title: "Vazhithunaiye",
        artist: "Tamil Song",
        cover: "images/dragon-tamil-2025.webp "
    },
    {
        url: "music/Hey Minnale.mp3",
        title: "Hey Minnale",
        artist: "Tamil Song",
        cover: "images/amaran-tamil-2024.webp"
    },
    {
        url: "music/Kannadi Poove.mp3",
        title: "Kannadi Poove",
        artist: "Tamil Song",
        cover: "images/retro-tamil-2025.webp"
    },
    {
        url: "music/Muththa-Mazhai-(Chinmayi-Version)-MassTamilan.dev.mp3",
        title: "Muththa Mazhai",
        artist: "Chinmayi",
        cover: "images/thug-life-tamil-2025-muththa-mazhai-chinmayi-version.webp"
    }
];

class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentTrack = 0;
        this.isPlaying = false;
        
        // DOM Elements
        this.playBtn = document.getElementById('play');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.progressBar = document.querySelector('.progress-bar');
        this.progress = document.querySelector('.progress');
        this.currentTime = document.querySelector('.current');
        this.duration = document.querySelector('.duration');
        this.title = document.querySelector('.title');
        this.artist = document.querySelector('.artist');
        this.albumCover = document.querySelector('.album-cover');
        this.player = document.querySelector('.music-player');
        
        this.initializePlayer();
        this.addEventListeners();
    }
    
    initializePlayer() {
        this.loadTrack(this.currentTrack);
        this.audio.volume = this.volumeSlider.value / 100;
    }
    
    loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        this.audio.src = track.url;
        this.title.textContent = track.title;
        this.artist.textContent = track.artist;
        this.albumCover.src = track.cover;
    }
    
    playPause() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.player.classList.remove('playing');
        } else {
            this.audio.play();
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.player.classList.add('playing');
        }
        this.isPlaying = !this.isPlaying;
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) this.audio.play();
    }
    
    prevTrack() {
        this.currentTrack = (this.currentTrack - 1 + playlist.length) % playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) this.audio.play();
    }
    
    updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
        
        // Update time displays
        this.currentTime.textContent = this.formatTime(currentTime);
        if (duration) this.duration.textContent = this.formatTime(duration);
    }
    
    setProgress(e) {
        const width = this.progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }
    
    setVolume() {
        this.audio.volume = this.volumeSlider.value / 100;
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    
    addEventListeners() {
        // Play/Pause
        this.playBtn.addEventListener('click', () => this.playPause());
        
        // Next/Previous
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        
        // Progress bar
        this.audio.addEventListener('timeupdate', (e) => this.updateProgress(e));
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));
        
        // Volume
        this.volumeSlider.addEventListener('input', () => this.setVolume());
        
        // Auto play next track
        this.audio.addEventListener('ended', () => this.nextTrack());
    }
}

// Initialize player
const player = new MusicPlayer(); 