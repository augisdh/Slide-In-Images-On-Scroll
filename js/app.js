"use strict";

function debounce(func, wait, immediate = true) {
    let timeout;

    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}

const slideImgs = document.querySelectorAll(".site-wrap .slide-in");

function slideIn(){
    slideImgs.forEach(img => {
        const imgSlideAt = (window.scrollY + window.innerHeight) - img.height / 2; // Image half position
        const imgBottom = img.offsetTop + img.height; // Image bottom position
        const halfShown = imgSlideAt > img.offsetTop;
        const imgNotScrolledPast = window.scrollY < imgBottom;

        (halfShown && imgNotScrolledPast) ? img.classList.add("active") : img.classList.remove("active");
    });
}

window.addEventListener("scroll", debounce(slideIn, 15));