const audioPlayer = document.querySelector('.audio_player audio');
const audioTitle = document.querySelector('.audio_player h1');
const audioSongName = document.querySelector('.audio_player h2');
const audioImage = document.querySelector('.audio_player img');
const audioPlay = document.querySelector('.audio_player .controls .play');
const audioPause = document.querySelector('.audio_player .controls .pause');
const audioStop = document.querySelector('.audio_player .controls .stop');
const audioFullTime = document.querySelector('.audio_player .time .full_time');
const audioNext = document.querySelector('.audio_player .controls .next');
const audioPrev = document.querySelector('.audio_player .controls .prev');
const audioVolume = document.querySelector('.audio_player .volume input');


const PlayList = ['audio/track_1.mp3', 'audio/track_2.mp3', 'audio/track_3.mp3', 'audio/track_4.mp3', 'audio/track_5.mp3'];
const SingerName = ['Miyagi & Andy Panda', 'Misho', 'Jah Khalib', 'Скриптонит', 'Billie Eilish'];
const SongName = ['Темнота', 'Ծառ', 'Созвездие ангела', 'Положение', 'Idontwannabeyouanymore'];
const songImage = ['img/1.jpg', 'img/2.jpg', 'img/3.png', 'img/4.jpg', 'img/5.jpg'];
let current = 0;

const audioFunction = {
    play() {
        audioPlayer.play();
        console.log(audioPlayer.currentTime);
    },
    pause() {
        audioPlayer.pause();
    },
    stop() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    },
    FullTime() {
        audioPlayer.currentTime = audioPlayer.duration * this.value / 100;
    },
    update() {
        audioFullTime.value = audioPlayer.currentTime * 100 / audioPlayer.duration;
        if (audioPlayer.currentTime > 0) {
            audioImage.style.animation = 'anim .3s linear infinite';
        } else {
            audioImage.style.animationPlayState = 'paused';
        }
    },
    nextSong() {
        current++;
        if (current == PlayList.length) {
            current = 0;
        }
        audioPlayer.src = PlayList[current];
        audioTitle.innerText = SingerName[current];
        audioSongName.innerText = SongName[current];
        audioImage.src = songImage[current];
        audioPlayer.play();
    },
    prevSong() {
        current--;
        if (current < 0) {
            current = PlayList.length - 1;
        }
        audioPlayer.src = PlayList[current];
        audioTitle.innerText = SingerName[current];
        audioSongName.innerText = SongName[current];
        audioImage.src = songImage[current];
        audioPlayer.play();
    },
    volume() {
        audioPlayer.volume = this.value / 100;
    }
};

audioPlay.addEventListener('click', audioFunction.play);
audioPause.addEventListener('click', audioFunction.pause);
audioStop.addEventListener('click', audioFunction.stop);
audioFullTime.addEventListener('input', audioFunction.FullTime);
audioPlayer.addEventListener('timeupdate', audioFunction.update);
audioNext.addEventListener('click', audioFunction.nextSong);
audioPrev.addEventListener('click', audioFunction.prevSong);
audioVolume.addEventListener('input', audioFunction.volume);