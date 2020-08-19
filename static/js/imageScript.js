document.getElementById("c-image-display").style.display = "none";
var img_container = document.getElementById("c-image-display");
var gallery_containerToBlur = document.getElementById('masonary-gallery');
var navbar_containerToBlur = document.getElementById('my-navbar');
var noScrollBar = document.getElementById('body');

function expandImg(_img) {
    if (img_container.style.display === "none") {
        // Enable Blur
        noScrollBar.setAttribute('class', 'no-scroll');
        gallery_containerToBlur.setAttribute('class', gallery_containerToBlur.getAttribute('class') + ' blurBackground');
        navbar_containerToBlur.setAttribute('class', navbar_containerToBlur.getAttribute('class') + ' blurBackground');

        img_container.style.display = "block";
    } 
    else {
        noScrollBar.classList.remove('no-scroll');

        // Disable Blur
        gallery_containerToBlur.classList.remove('blurBackground');
        gallery_containerToBlur.setAttribute('class', gallery_containerToBlur.getAttribute('class'));

        navbar_containerToBlur.classList.remove('blurBackground');
        navbar_containerToBlur.setAttribute('class', navbar_containerToBlur.getAttribute('class'));

        img_container.style.display = "none";
    }
}

function displayImg(_img) {
    var filepath = _img.src;
    var splitPath = filepath.split('/');
    var findIndex = splitPath.indexOf('images');
    var splitPath = splitPath.slice(findIndex, splitPath.length);
    var reconstruct = splitPath.join('/')

    var img = document.getElementById("enlarge-display");
    img.src = Flask.url_for('static', {'filename': reconstruct});
}


img_container.onclick = function() {
    if (img_container.style.display === "block") {
        expandImg(this);
    }
};