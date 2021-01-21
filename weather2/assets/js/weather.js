const ELEM = {} || ELEM;

/* DOCUMENT ELEMENTS */

ELEM.menuToggle = document.getElementById('nav-toggle');
ELEM.menuIcon = document.getElementById('menu-icon');
ELEM.navMenu = document.getElementById('nav-menu');
ELEM.banner = document.getElementById('banner');
ELEM.bannerClose = document.getElementById('close-banner');

/* EVENT LISTENERS */

document.addEventListener('DOMContentLoaded', () => {
    if (new Date().getDay() === 5) {
        ELEM.banner.classList.remove('banner-hide');
    }
})


ELEM.menuToggle.onclick = () => {
    ELEM.menuIcon.classList.toggle('close-menu');
    for (var elem of ELEM.navMenu.children) {
        elem.classList.toggle('show-menu');
    }
    if (ELEM.menuIcon.src.includes('close-icon')) {
        ELEM.menuIcon.src = "./assets/img/menu-icon.png"

    } else {
        ELEM.menuIcon.src = "./assets/img/close-icon.png";
    }
}

ELEM.bannerClose.onclick = () => {
    ELEM.banner.classList.add('banner-hide');
}