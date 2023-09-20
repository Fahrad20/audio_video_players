const videoPlayerBlock = document.querySelector('.videoPlayer');
const videoPlayer = document.querySelector('.videoPlayer video');
const videoPlayControl = document.querySelector('.videoPlayer .controls');
const videoPlay = document.querySelector('.videoPlayer .controls .playPouseStop .play');
const videoPause = document.querySelector('.videoPlayer .controls .playPouseStop .pause');
const videoStop = document.querySelector('.videoPlayer .controls .playPouseStop .stop');
const videoVolume = document.querySelector('.videoPlayer .controls .volumeBlock input');
const videoVolumeValue = document.querySelector('.videoPlayer .controls .volumeBlock span');
const videoVolumeMuted = document.querySelector('.videoPlayer .controls .volumeBlock button');
const videoFullTime = document.querySelector('.videoPlayer .controls .fullTime input');
const videoCurrentValue = document.querySelector('.videoPlayer .controls .timeBlock .current');
const videoDurationValue = document.querySelector('.videoPlayer .controls .timeBlock .duration');
const videoSpeed = document.querySelector('.videoPlayer .controls .speedBlock span');
const videoPlayBackRate = document.querySelector('.videoPlayer .controls .speedBlock .playBackRate');
const videoMinus10 = document.querySelector('.videoPlayer .minus10');
const videoPlus10 = document.querySelector('.videoPlayer .plus10');
const videoMSymbol = document.querySelector('.videoPlayer .minus10 .symbol');
const videoPSymbol = document.querySelector('.videoPlayer .plus10 .symbol');
const videoFull = document.querySelector('.videoPlayer .controls .fullScreen');
const videoPlayList = document.querySelector('.videoPlayer .playList');
const videoPlayListItems = document.querySelectorAll('.videoPlayer .playList .item');
const videoPlayListVideo = document.querySelectorAll('.videoPlayer .playList .item video');
const videoPlayListButton = document.querySelector('.videoPlayer .controls .playlist_menu button');
const videoTheme = document.querySelector('.videoPlayer .controls .theme button');
const videoThemeFilters = document.querySelector('.videoPlayer .filters');
const videoControlHide = document.querySelector('.videoPlayer .controls_hide');
const videoControlShow = document.querySelector('.videoPlayer .controls_show');
const videoContextMenu = document.querySelector('.videoPlayer .context_menu');




const videoFunction = {
    play() {
        videoPlayer.play();
    },
    pause() {
        videoPlayer.pause();
    },
    stop() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    },
    volume() {
        videoPlayer.volume = videoVolume.value / 100;
        videoVolumeValue.innerText = videoVolume.value;
        if(videoVolume.value == 0) {
            videoVolumeMuted.innerHTML = '<i class="fa fa-volume-off"></i>';
            videoVolumeMuted.style.transform = 'translateX(15px)';
            videoVolumeMuted.style.transition = '.8s';
        }else {
            videoVolumeMuted.innerHTML = '<i class="fa fa-volume-up"></i>';
            videoVolumeMuted.style.transform = 'translateX(0)';
            videoVolumeMuted.style.transition = '.2s';
        }
    },
    muted() {
        if(videoPlayer.muted) {
            videoPlayer.muted = false;
            videoPlayer.volume = 1;
            videoVolumeMuted.innerHTML = '<i class="fa fa-volume-up"></i>';
            videoVolumeMuted.style.transform = 'translateX(0)';
            videoVolumeMuted.style.transition = '.2s';
            videoVolume.value = 100;
            videoVolumeValue.innerText = '100';
        }else {
            videoPlayer.muted = true;
            videoPlayer.volume = 0;
            videoVolumeMuted.innerHTML = '<i class="fa fa-volume-off"></i>';
            videoVolumeMuted.style.transform = 'translateX(15px)';
            videoVolumeMuted.style.transition = '.8s';
            videoVolume.value = 0;
            videoVolumeValue.innerText = '0';
        }        
    },
    fullTime() {
       videoPlayer.currentTime = videoPlayer.duration * videoFullTime.value / 100;
    },
    update() {
        videoFullTime.value = videoPlayer.currentTime * (100 / videoPlayer.duration);
        let x = videoFullTime.value;
        let color = `linear-gradient(to right, rgb(255, 0, 0) ${x}%, rgb(34, 34, 34) ${x}%)`;
        videoFullTime.style.background = color;
        
        let curmins = Math.floor(videoPlayer.currentTime / 60);
        let cursec = Math.floor(videoPlayer.currentTime - curmins * 60);
        let durmins = Math.floor(videoPlayer.duration / 60);
        let dursec = Math.floor(videoPlayer.duration - durmins * 60);
        curmins < 10 ? curmins = '0' + curmins : '';
        cursec < 10 ? cursec = '0' + cursec : '';
        durmins < 10 ? durmins = '0' + durmins : '';
        dursec < 10 ? dursec = '0' + dursec : '';
        
        videoCurrentValue.innerHTML = curmins + ':' + cursec + ' / ';
        videoDurationValue.innerHTML = durmins + ':' + dursec;
    },
    timeHover() {
        videoFullTime.style.height = '7px';
        videoFullTime.style.transition = '.7s';
        videoFullTime.classList.add('active');
    },
    timeHoverOut() {
        videoFullTime.style.height = '3px';
        videoFullTime.style.transition = '.7s';
        videoFullTime.classList.remove('active');
    },
    showPlayBack() {
        if(videoPlayBackRate.style.opacity != 1) {
            videoPlayBackRate.style.opacity = 1;
            videoPlayBackRate.style.visibility = 'visible';
        }else {
            videoPlayBackRate.style.opacity = 0;
            videoPlayBackRate.style.visibility = 'hidden';
        }
    },
    playPause() {
        if(videoPlayer.paused) {
            videoPlayer.play();
        }else {
            videoPlayer.pause();
        }
    },
    minus10() {
        videoPlayer.currentTime -= 10;
    },
    plus10() {
        videoPlayer.currentTime += 10;
    },
    symbols(opacity) {
        this.style.opacity = opacity;
    },
    playBackSpeed(x) {
        videoPlayer.playbackRate = x;
    },
    fullScreen() {
        if (document.querySelector('.videoPlayer .controls .fullScreen input').checked) {
            document.querySelector('.videoPlayer .controls .fullScreen i:nth-of-type(2)').style.display = 'block';
            document.querySelector('.videoPlayer .controls .fullScreen i:nth-of-type(1)').style.display = 'none';
            if (videoPlayerBlock.requestFullscreen) {
                videoPlayerBlock.requestFullscreen();
            } else if (videoPlayerBlock.webkitRequestFullscreen) {
                videoPlayerBlock.webkitRequestFullscreen();
            } else if (videoPlayerBlock.msRequestFullscreen) {
                videoPlayerBlock.msRequestFullscreen();
            }
        }else {
            document.querySelector('.videoPlayer .controls .fullScreen i:nth-of-type(2)').style.display = 'none';
            document.querySelector('.videoPlayer .controls .fullScreen i:nth-of-type(1)').style.display = 'block';
            if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) { 
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { 
                document.msExitFullscreen();
              }
        }
    },
    showPlayList() {
        if(videoPlayList.style.top != '0%') {
            videoPlayList.style.top = '0%';
            videoPlayListButton.style.transform = 'rotate(-270deg)';
        }else {
            videoPlayList.style.top = '100%';
            videoPlayListButton.style.transform = 'rotate(0)';
        };
    },
    showThemes() {
      if(videoThemeFilters.style.left != '0px') {
          videoThemeFilters.style.left = '0px';
      }else {
          videoThemeFilters.style.left = '-80px';
      };
    },
    themes(filter) {
        videoPlayer.style.filter = filter;
    },
    controlHide() {
        videoPlayControl.style.transform = 'translateY(105px)';
        videoPlayControl.style.opacity = '0';
        videoControlShow.style.opacity = '1';
        videoControlShow.style.visibility = 'visible';
    },
    controlShow() {
        videoPlayControl.style.transform = 'translateY(0)';
        videoPlayControl.style.opacity = '1';
        videoControlShow.style.opacity = '0';
        videoControlShow.style.visibility = 'hidden';
    },
    contextMenu(event) {
        videoContextMenu.style.top = event.pageY + 'px';
        videoContextMenu.style.left = event.pageX + 'px';
        videoContextMenu.style.opacity = '1';
        event.preventDefault();
    },
    contextOpacity() {
        videoContextMenu.style.opacity = '0';
    }
}; 


videoPlay.addEventListener('click', videoFunction.play);
videoPause.addEventListener('click', videoFunction.pause);
videoStop.addEventListener('click', videoFunction.stop);
videoVolume.addEventListener('input', videoFunction.volume);
videoVolumeMuted.addEventListener('click', videoFunction.muted);
videoFullTime.addEventListener('input', videoFunction.fullTime);
videoPlayer.addEventListener('timeupdate', videoFunction.update);
videoFullTime.addEventListener('mouseover', videoFunction.timeHover);
videoFullTime.addEventListener('mouseleave', videoFunction.timeHoverOut);
videoSpeed.addEventListener('click', videoFunction.showPlayBack);
videoMinus10.addEventListener('dblclick', videoFunction.minus10);
videoMinus10.addEventListener('click', videoFunction.playPause);
videoPlus10.addEventListener('dblclick', videoFunction.plus10);
videoPlus10.addEventListener('click', videoFunction.playPause);
videoMinus10.addEventListener('dblclick', videoFunction.symbols.bind(videoMSymbol, 1));
videoPlus10.addEventListener('dblclick', videoFunction.symbols.bind(videoPSymbol, 1));
videoMinus10.addEventListener('mouseleave', videoFunction.symbols.bind(videoMSymbol, 0));
videoPlus10.addEventListener('mouseleave', videoFunction.symbols.bind(videoPSymbol, 0));
videoFull.addEventListener('click', videoFunction.fullScreen);
videoPlayListButton.addEventListener('click', videoFunction.showPlayList);
videoTheme.addEventListener('click', videoFunction.showThemes);
videoControlHide.addEventListener('click', videoFunction.controlHide);
videoControlShow.addEventListener('click', videoFunction.controlShow);
videoPlayerBlock.addEventListener('contextmenu', videoFunction.contextMenu);
videoPlayerBlock.addEventListener('click', videoFunction.contextOpacity);


for(let i = 0; i < videoPlayListItems.length; i++) {
    videoPlayListItems[i].onclick = function() {
      videoPlayer.src = videoPlayListVideo[i].src;  
        videoPlayer.play();
    };
}







