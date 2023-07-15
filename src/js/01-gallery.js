// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

// add event to father element
const galleryElement = document.querySelector("ul.gallery");

function addMarkup() {
  // get atribut from 'galleryItems'
  return galleryItems
    .map(
      (element) =>
        `
     <li class="gallery__item">
        <a class="gallery__link" href="${element.original}">
            <img 
                class="gallery__image"
                src="${element.preview}"  
                alt = "${element.description}"
            > 
        </a>
      </li>`
    )
    .join("");
}

// add content to 'gallery'
galleryElement.insertAdjacentHTML('beforeend', addMarkup());

// create lightbox
const gallery = new SimpleLightbox(".gallery a", {   
  captionsData: "alt",
  captionDelay: 250,
});

console.log(galleryItems);
