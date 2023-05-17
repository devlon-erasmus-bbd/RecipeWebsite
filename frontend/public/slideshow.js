let slideshowContainer = document.querySelector('.slideshow-container');
let images = ['food1.jpg', 'food2.jpg', 'food3.jpg', 'food4.jpg', 'food5.jpg'];

let index = 0;

const changeImage = () => {
  slideshowContainer.style.backgroundImage = `url('../public/slideshow/${images[index]}')`;
  index = (index + 1) % images.length;
  setTimeout(changeImage, 5000); // Change image every 5 seconds
}

changeImage();
