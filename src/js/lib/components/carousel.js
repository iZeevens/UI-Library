import $ from '../core';

$.prototype.carousel = function() {
    for (let i = 0; i < this.length; i++) {
        const carousel = this[i];
        const width = window.getComputedStyle(carousel.querySelector('.carousel-inner')).width;
        const slides = carousel.querySelectorAll('.carousel-item');
        const slidesField = carousel.querySelector('.carousel-slides');
        const dots = carousel.querySelectorAll('.carousel-indicators li');
        
        const widthNum = +width.replace(/\D/g, '');
        const slideTransition = (newOffset, newSlideIndex) => {
            slidesField.style.transform = `translateX(-${newOffset}px)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[newSlideIndex].classList.add('active');
        }

        slidesField.style.width = 100 * slides.length + '%';
        slides.forEach(slide => {
            slide.style.width = width;
        });

        let offset = 0, slideIndex = 0;

        if (carousel.dataset.autoSlide === 'true') {
            setInterval(() => {
                offset = (offset == (widthNum * (slides.length - 1))) ? 0 : offset + widthNum;
                slideIndex = (slideIndex == slides.length - 1) ? 0 : slideIndex + 1;
                slideTransition(offset, slideIndex);
            }, 2000)
        }

        $(carousel.querySelector('[data-slide="next"]')).click((e) => {
            e.preventDefault();
            offset = (offset == (widthNum * (slides.length - 1))) ? 0 : offset + widthNum;
            slideIndex = (slideIndex == slides.length - 1) ? 0 : slideIndex + 1;
            slideTransition(offset, slideIndex);
        });

        $(carousel.querySelector('[data-slide="prev"]')).click((e) => {
            e.preventDefault();
            offset = (offset == 0) ? widthNum * (slides.length - 1) : offset - widthNum;
            slideIndex = (slideIndex == 0) ? slides.length - 1 : slideIndex - 1;
            slideTransition(offset, slideIndex);
        });

        $(`#${carousel.id} .carousel-indicators li`).click((e) => {
            slideIndex = e.target.getAttribute('data-slide-to');
            offset = widthNum * slideIndex;
            slideTransition(offset, slideIndex);
        })
    }
};

$('.carousel').carousel();
