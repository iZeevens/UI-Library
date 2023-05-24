import $ from '../core';

$.prototype.animateOverTime = function(dur, cb, fin) {
    let timeStart;
    let animationRunning = false;


    function _animateOverTime(time) {
        if (!timeStart) {
            timeStart = time;
        }

        let timeElapsed = time - timeStart;
        let complaction = Math.min(timeElapsed / dur, 1);

        cb(complaction);

        if (timeElapsed < dur) {
            animationRunning = true;
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof fin === 'function') {
                fin();
            }
            animationRunning = false;
        }
    }

    return {animation: _animateOverTime, isRunning: () => animationRunning}
};

$.prototype.fadeIn = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].animation && this[i].animation.isRunning()) {
            return this;
        }

        this[i].style.display = display || 'block';

        const _fadeIn = (complaction) => {
            this[i].style.opacity = complaction;
        };

        const ani = this.animateOverTime(dur, _fadeIn, fin);
        this[i].animation = ani;
        requestAnimationFrame(ani.animation);
    }

    return this;
};

$.prototype.fadeOut = function(dur, fin) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].animation && this[i].animation.isRunning()) {
            return this;
        }

        const _fadeOut = (complaction) => {
            this[i].style.opacity = 1 - complaction;
            if (complaction === 1) {
                this[i].style.display = 'none';
            }
        };

        const ani = this.animateOverTime(dur, _fadeOut, fin);
        this[i].animation = ani;
        requestAnimationFrame(ani.animation); 
    }

    return this;
};

$.prototype.fadeToggle = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
                $(this[i]).fadeIn(dur, display, fin);
        } else {
            for (let i = 0; i < this.length; i++) {
                $(this[i]).fadeOut(dur, fin);
            }
        }
    }

    return this;
}