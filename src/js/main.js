/* Your JS here. */
// console.log('Hello World!')

const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');
let initialNavbarHeight = header.offsetHeight;

const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const slides = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li a'); //here?

    const scrollPosition = window.scrollY;
    if (scrollPosition > initialNavbarHeight) {
        header.classList.add('small'); 
    } 
    else {
        header.classList.remove('small');
    }
  
    let current = '';  
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
    
        if (scrollY >= sectionTop - sectionHeight) {
            current = section.getAttribute('id');
        }
    });
  
    navLinks.forEach(link => {  //change 
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


window.addEventListener('resize', function() {
    initialNavbarHeight = header.offsetHeight; 
});

function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {  //calculate 
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {  //recalculate?
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});


document.addEventListener("DOMContentLoaded", function() {  
    const projects = document.querySelectorAll(".project");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");
  
    projects.forEach(project => {
        project.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.classList.add("show");
        });
    });
  
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".modal");
            modal.classList.remove("show");
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener("click", function(e) {
            if (e.target === this) {
            this.classList.remove("show");
            }
        });
    });
});
  