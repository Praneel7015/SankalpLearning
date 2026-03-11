/* ============================================
   SANKALP LEARNING — Main JS v2.0
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

    /* ---- Sticky nav shadow on scroll ---- */
    var header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    /* ---- Mobile menu toggle ---- */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open);
            // Toggle hamburger animation
            toggle.classList.toggle('active', open);
        });
        // Close on nav link click
        nav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                nav.classList.remove('is-open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---- Scroll-triggered fade-in ---- */
    var fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length && 'IntersectionObserver' in window) {
        var fadeObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    fadeObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        fadeEls.forEach(function (el) { fadeObs.observe(el); });
    } else {
        // Fallback: show all
        fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---- Animated counters ---- */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
        var countObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    animateCounter(e.target);
                    countObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { countObs.observe(el); });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var duration = 2200;
        var start = null;

        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var val = Math.floor(eased * target);
            el.textContent = prefix + val.toLocaleString('en-IN') + suffix;
            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
            }
        }
        requestAnimationFrame(step);
    }

    /* ---- Smooth anchor scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#' || id === '#/portal/') return;
            var t = document.querySelector(id);
            if (t) {
                e.preventDefault();
                t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
