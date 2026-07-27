/* ============================================
   Vella Design — Script
   ============================================ */

(function () {
    'use strict';

    // --- Sticky Header ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    function handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // --- Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        }
    );

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // --- Contact Form ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = form.querySelector('#name');
            var email = form.querySelector('#email');
            var message = form.querySelector('#message');
            var submitBtn = form.querySelector('.btn-submit');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                shakeInvalid(form);
                return;
            }

            if (!isValidEmail(email.value)) {
                email.style.borderColor = '#FF6B6B';
                return;
            }

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                form.reset();

                setTimeout(function () {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function shakeInvalid(form) {
        var inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(function (input) {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#FF6B6B';
                input.style.animation = 'shake 0.4s ease';
                setTimeout(function () {
                    input.style.borderColor = '';
                    input.style.animation = '';
                }, 1000);
            }
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Service cards hover tilt (subtle) ---
    var serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -3;
            var rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    // --- Add shake keyframe ---
    var style = document.createElement('style');
    style.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}';
    document.head.appendChild(style);

})();
