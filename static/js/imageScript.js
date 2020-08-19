document.getElementById("c-image-display").style.display = "none";
var img_container = document.getElementById("c-image-display");
var containerToBlur = document.getElementById('masonary-gallery');

function expandImg(_img) {
    if (img_container.style.display === "none") {
        // Enable Blur
        containerToBlur.setAttribute('class', containerToBlur.getAttribute('class') + ' blurBackground');

        img_container.style.display = "block";
    } 
    else {
        // Disable Blur
        containerToBlur.classList.remove('blurBackground')
        containerToBlur.setAttribute('class', containerToBlur.getAttribute('class'));

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