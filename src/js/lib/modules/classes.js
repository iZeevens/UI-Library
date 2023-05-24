import $ from '../core';

$.prototype.addClass = function(...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList || classNames.includes('')) {
            continue;
        }
        this[i].classList.add(...classNames);
    }

    return this;
};

$.prototype.removeClass = function(...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList || classNames.includes('')) {
            continue;
        }
        this[i].classList.remove(...classNames);
    }

    return this;
};

$.prototype.toggleClass = function(classNames) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList || classNames === 0) {
            continue;
        }
        this[i].classList.toggle(classNames);
    }

    return this;
};