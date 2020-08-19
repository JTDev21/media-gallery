document.getElementById("c-image-display").style.display = "none";
var img_container = document.getElementById("c-image-display");
var containerToBlur = document.getElementById('masonary-gallery');

function expandImg(_img) {
    if (img_container.style.display === "none") {
        // Enable Blur
        containerToBlur.setAttribute('class', containerToBlur.getAttribute('class') + ' blurBackground');

        img_container.style.display = "block";
        var img = document.getElementById("enlarge-display");
        img.src = "https://wallpapercave.com/wp/wp2551790.jpg";
    } 
    else {
        // Disable Blur
        containerToBlur.classList.remove('blurBackground')
        containerToBlur.setAttribute('class', containerToBlur.getAttribute('class'));

        img_container.style.display = "none";
    }
}

img_container.onclick = function() {
    if (img_container.style.display === "block") {
        expandImg(this);
    }
};