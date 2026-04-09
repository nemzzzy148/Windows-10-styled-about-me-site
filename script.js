const startMenu = document.querySelector('.start-menu');
const windowsButton = document.querySelector('#windows');

windowsButton.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target)) {
        startMenu.classList.remove('open');
    }
});

const clock = document.querySelector('#clock');

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 1000);

const plateImg = document.querySelector('.start-menu-plate img');
let currentAngle = 0;
let speed = 0;
let targetSpeed = 0;
let rafId = null;

function tick() {
    speed += (targetSpeed - speed) * 0.05;
    currentAngle += speed;
    plateImg.style.transform = `rotate(${currentAngle}deg)`;

    if (Math.abs(speed - targetSpeed) > 0.001 || targetSpeed > 0) {
        rafId = requestAnimationFrame(tick);
    } else {
        rafId = null;
    }
}

function startLoop() {
    if (!rafId) rafId = requestAnimationFrame(tick);
}

const songs = [
    { path: 'audio/dramamine.m4a',    title: 'Dramamine - Single', image: 'covers/dramamine.png' },
    { path: 'audio/RelaxingSleep.m4a', title: 'Relaxing Sleep',    image: 'covers/relaxing_sleep.png' },
];

let currentIndex = 0;
const audio = new Audio();
const menuTitle = document.querySelector('.start-menu-top h2');
const leftBtn = document.querySelector('.start-menu-left');
const rightBtn = document.querySelector('.start-menu-right');
const plate = document.querySelector('.start-menu-plate');
const plateIcon = document.querySelector('.start-menu-plate p');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.path;
    plateImg.src = song.image;
    menuTitle.textContent = song.title;
}

function playSong() {
    audio.play();
    targetSpeed = 0.5;
    startLoop();
}

function pauseSong() {
    audio.pause();
    targetSpeed = 0;
    startLoop();
}

plate.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
        plateIcon.classList.add('playing');
    } else {
        pauseSong();
        plateIcon.classList.remove('playing');
    }
});

leftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
    plateIcon.classList.add('playing');
});

rightBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
    plateIcon.classList.add('playing');
});

audio.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
    plateIcon.classList.add('playing');
});

loadSong(currentIndex);

// github

function openGitHub() {
    window.open('https://github.com/nemzzzy148', '_blank');
}

// discord

function openDiscord() {
    window.open('https://discord.gg/E69z25dBsq', '_blank');
}

// task bar

document.getElementById('about-me').addEventListener('click', () => {
    document.querySelectorAll('.window')[0].scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contact').addEventListener('click', () => {
    document.querySelectorAll('.window')[1].scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('skills').addEventListener('click', () => {
    document.querySelectorAll('.window')[2].scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('education').addEventListener('click', () => {
    document.querySelectorAll('.window')[4].scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('hobbies').addEventListener('click', () => {
    document.querySelectorAll('.window')[3].scrollIntoView({ behavior: 'smooth' });
});