document.getElementById("c-media").style.display = "none";
var media_container = document.getElementById("c-media");

var gallery_containerToBlur = document.getElementById('masonary-gallery');
var navbar_containerToBlur = document.getElementById('my-navbar');
var noScrollBar = document.getElementById('body');

var img_div = document.getElementById("c-image-display");
var video_div = document.getElementById("c-video-display");

function viewer(_img) {
    if (media_container.style.display === "none") {
        // Enable Blur
        noScrollBar.setAttribute('class', 'no-scroll');
        gallery_containerToBlur.setAttribute('class', gallery_containerToBlur.getAttribute('class') + ' blurBackground');
        navbar_containerToBlur.setAttribute('class', navbar_containerToBlur.getAttribute('class') + ' blurBackground');

        media_container.style.display = "block";
        video_div.style.display = "block";
        img_div.style.display = "block";

        viewFile(_img);
    } 
    else {
        noScrollBar.classList.remove('no-scroll');

        // Disable Blur
        gallery_containerToBlur.classList.remove('blurBackground');
        gallery_containerToBlur.setAttribute('class', gallery_containerToBlur.getAttribute('class'));

        navbar_containerToBlur.classList.remove('blurBackground');
        navbar_containerToBlur.setAttribute('class', navbar_containerToBlur.getAttribute('class'));

        media_container.style.display = "none";
        video_div.style.display = "none";
        img_div.style.display = "none";
    }
}

function isImage(ext) {
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
        //etc
        return true;
    }
    return false;
}

function isVideo(ext) {
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
        // etc
        return true;
    }
    return false;
}

function viewFile(file) {
    var objectPath = file.src;

    var img_filename = objectPath.split('.');
    var video_filename = objectPath.split('.');
    
    var img_ext = String(video_filename[img_filename.length - 1]);
    var video_ext = String(video_filename[video_filename - 1]);

    var splitPath = objectPath.split('/');
    var findIndex = splitPath.indexOf('media_files');
    var splitPath = splitPath.slice(findIndex, splitPath.length);
    var reconstruct = splitPath.join('/');

    // console.log(reconstruct);
    if (isImage(img_ext)) {
        video_div.style.display = "none";
        var img = document.getElementById("enlarge-img");
        img.src = Flask.url_for('static', {'filename': reconstruct});
    }
    else if (isVideo(video_ext)) {
        img_div.style.display = "none";
        var video = document.getElementById("video-src");
        video.src = Flask.url_for('static', {'filename': reconstruct});
    }
}


media_container.onclick = function(event) {
    // console.log(event.target.id, media_container.style.display);
    if ((event.target.id === "c-video-display" || event.target.id === "enlarge-img") && media_container.style.display === "block") {
        viewer(this);
    }
};

var video = document.getElementById('play-pause-masonary-vid');
var startStop_btn = document.getElementById('play-pause');
var video_containter = document.getElementById('video-container');

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

video_containter.onclick = function() {
    togglePlayPause();
};