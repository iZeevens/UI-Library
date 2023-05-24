import $ from '../core';

// $.prototype.accordion = function() {
//     for (let i = 0; i < this.length; i++) {
//         $(this[i]).click(() => {
//             $(this[i])
//                 .addClass('accordion-item--active')
//                 .siblings()
//                 .removeClass('accordion-item--active')
//                 .closest('.accordion')
//                 .find('.accordion-content')
//                 .removeClass('accordion-content--active')
//                 .eq($(this[i]).index())
//                 .addClass('accordion-content--active')
//         });
//     }
// }

$.prototype.accordion = function(headActive = 'accordion-item--active', contentActive = 'accordion-content--active') {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).click(() => {
            $(this[i]).toggleClass(headActive);
            $(this[i].nextElementSibling).toggleClass(contentActive);

            if (this[i].classList.contains(headActive)) {
                this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this[i].nextElementSibling.style.maxHeight = '0px';
            }
        });
    }
}

$('.accordion-header').accordion();