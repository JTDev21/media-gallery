var video = document.querySelector('.video');
var juice = document.querySelector('.orange-juice');

var video_containter = document.getElementById('video');
var startStop_btn = document.getElementById('play-pause');

var skipBackward_btn = document.getElementById('fast-backward-btn');
var skipForward_btn = document.getElementById('fast-forward-btn');

var current_time = document.getElementById("current-time");
var separator = document.getElementById("separator");
var time_duration = document.getElementById("time-duration");

var current_HMS_time = [];
var video_HMS_time = [];

var skipValue = 10;

var screenSize_btn = document.getElementById('screenSize');

function togglePlayPause() {
    if(video.paused) {
        startStop_btn.className = 'pause';
        video.play();
    }
    else {
        startStop_btn.className = 'play';
        video.pause();
    }
}

startStop_btn.onclick = function() {
    togglePlayPause();
};

video_containter.onclick = function() {
    togglePlayPause();
};

skipBackward_btn.onclick = function () {
    video.currentTime -= skipValue;
};

skipForward_btn.onclick = function () {
    video.currentTime += skipValue;
};

function computeTime(time, timeArr) {
    time = time.toFixed(0);
    var hours = Math.floor(time / 3600);
    time %= 3600;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    hours = hours.toString();
    minutes = minutes.toString();
    seconds = seconds.toString();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10 && hours != 0) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timeArr[0] = hours;
    timeArr[1] = minutes;
    timeArr[2] = seconds;
}

function timeDisplay()
{
    computeTime(video.currentTime, current_HMS_time);
    computeTime(video.duration, video_HMS_time);

    if (current_HMS_time[0] == 0) {
        current_time.textContent = current_HMS_time[1] + ":" + current_HMS_time[2];
    }
    else {
        current_time.textContent = current_HMS_time[0] + ":" + current_HMS_time[1] + ":" + current_HMS_time[2];
    }

    if (video_HMS_time[0] == 0) {
        time_duration.textContent = video_HMS_time[1] + ":" + video_HMS_time[2];
    }
    else {
        time_duration.textContent = video_HMS_time[0] + ":" + video_HMS_time[1] + ":" + video_HMS_time[2];
    }
}

function toggleFullScreen() {
	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}

video.addEventListener('timeupdate', function()
{
    timeDisplay();
    var juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + "%";

    if(video.ended) {
        startStop_btn.className = "play";
    }
});

screenSize_btn.addEventListener("click",toggleFullScreen,false);