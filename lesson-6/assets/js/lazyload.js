let imagesToLoad = document.querySelectorAll('img[data-src]');

const imageOptions = { 
    threshold: 0,
    rootMargin: "0px 0px 200px 0px"
};

const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            loadImages(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imageOptions);

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

imagesToLoad.forEach((img) => {
    imageObserver.observe(img);
  });