let currentSlide = 1;
const totalSlides = 5;
const slideTitles = ['Appetizers', 'Signature Plates', 'Desserts', 'Beverages', 'Cocktails'];

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots span');
  const titleElement = document.querySelector('.carousel-header h3');
  
  if (n > totalSlides) currentSlide = 1;
  if (n < 1) currentSlide = totalSlides;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.textContent = '○');
  
  slides[currentSlide - 1].classList.add('active');
  dots[currentSlide - 1].textContent = '●';
  
  if (titleElement) {
    titleElement.textContent = slideTitles[currentSlide - 1];
  }
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', function() {
  const leftArrows = document.querySelectorAll('.nav-arrow.left');
  const rightArrows = document.querySelectorAll('.nav-arrow.right');
  
  leftArrows.forEach(arrow => arrow.addEventListener('click', prevSlide));
  rightArrows.forEach(arrow => arrow.addEventListener('click', nextSlide));
  
  showSlide(currentSlide);
});
