import $ from '../core';

$.prototype.onAttr= function(name, value) {
    if (name !== '' && value !== '') {
        for (let i = 0; i < this.length; i++) {
            this[i].setAttribute(name, value);
        }
    }

    return this;
};

$.prototype.offAttr = function(name) {
    if (name !== '') {
        for (let i = 0; i < this.length; i++) {
            this[i].removeAttribute(name);
        }
    }

    return this;
};


$.prototype.toggleAttr = function(name) {
    if (name !== '') {
        for (let i = 0; i < this.length; i++) {
            this[i].toggleAttribute(name);
        }
    }

    return this;
};

