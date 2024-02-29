const image_container = document.getElementById('img-container');
const loader = document.getElementById('loader');
let photos = [];
let ready = false;
let imageLoaders = 0;
let totalImage = 0;
const count = 30;
const apiKey = 'xHaShpC9g6klYpeBj4fqj0HhYjKuVCqRE7Jm3tQEiIY'
// console.log(apiKey);
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }

}
function imageLoader() {
    imageLoaders++;
    if (imageLoaders === totalImage) {
        ready = true;
        loader.hidden = true;

    }
}

function displayPhotos() {
    imageLoaders = 0;
    totalImage = photos.length;
    photos.forEach((photo) => {
        // Create <a> to link Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create Img 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Put the image inside <a> and both in image_container
        img.addEventListener('load', imageLoader);
        item.appendChild(img);
        image_container.appendChild(item);
    });
}



async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photos = await response.json();
        // console.log(photos);
        displayPhotos();
    }
    catch (error) {
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {

        ready = false;
        console.log('loaded');
        getPhotos();

    }
});




getPhotos();