/* =========================================
   ANANDA FINE INDIAN CUISINE — MAIN SCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // 1. NAVIGATION — Scroll shrink + mobile toggle
    // ─────────────────────────────────────────────
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });


    // ─────────────────────────────────────────────
    // 2. SCROLL REVEAL — IntersectionObserver
    // ─────────────────────────────────────────────
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        },
        { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // ─────────────────────────────────────────────
    // 3. SPICE PARTICLES — Hero section
    // ─────────────────────────────────────────────
    function createParticles() {
        const container     = document.getElementById('particles');
        const PARTICLE_COUNT = 20;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size     = Math.random() * 8 + 4;
            const left     = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay    = Math.random() * 10;

            Object.assign(particle.style, {
                width:             `${size}px`,
                height:            `${size}px`,
                left:              `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay:    `${delay}s`,
            });

            container.appendChild(particle);
        }
    }

    createParticles();


    // ─────────────────────────────────────────────
    // 4. 3D TILT EFFECT — Experiences cards
    //    (disabled on touch/pointer:coarse devices)
    // ─────────────────────────────────────────────
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.tilt-card').forEach(card => {

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; // Instant response during movement
            });

            card.addEventListener('mousemove', e => {
                const rect    = card.getBoundingClientRect();
                const x       = e.clientX - rect.left;
                const y       = e.clientY - rect.top;
                const centerX = rect.width  / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) *  10;

                card.style.transform =
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease';
                card.style.transform  = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }


    // ─────────────────────────────────────────────
    // 5. GALLERY LIGHTBOX
    // ─────────────────────────────────────────────
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            lightboxImg.src = item.querySelector('img').src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close helpers
    window.closeLightbox = function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) window.closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            window.closeLightbox();
        }
    });


    // ─────────────────────────────────────────────
    // 6. RESERVATION FORM — Validation & submission
    // ─────────────────────────────────────────────
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    window.handleReservation = function (event) {
        event.preventDefault();

        const name   = document.getElementById('resName').value.trim();
        const email  = document.getElementById('resEmail').value.trim();
        const phone  = document.getElementById('resPhone').value.trim();
        const msgBox = document.getElementById('formMsg');

        // ── Validation
        if (!EMAIL_REGEX.test(email)) {
            showFormMessage(msgBox, 'error', 'Please enter a valid email address.');
            return;
        }

        if (!PHONE_REGEX.test(phone)) {
            showFormMessage(msgBox, 'error', 'Please enter a valid phone number.');
            return;
        }

        // ── Simulate async API call
        const btn          = event.target.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent    = 'Booking…';
        btn.disabled       = true;

        setTimeout(() => {
            showFormMessage(
                msgBox,
                'success',
                `Reservation confirmed for <b>${name}</b>. A confirmation email has been sent.`
            );
            event.target.reset();
            btn.textContent = originalText;
            btn.disabled    = false;

            // Auto-hide message after 5 s
            setTimeout(() => {
                msgBox.style.display = 'none';
                msgBox.className = 'form-msg';
            }, 5000);
        }, 1500);
    };

    function showFormMessage(el, type, html) {
        el.className   = `form-msg ${type}`;
        el.innerHTML   = html;
        el.style.display = 'block';
    }

    // Set today as the minimum reservable date
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }


    // ─────────────────────────────────────────────
    // 7. ADD-TO-CART TOAST NOTIFICATION
    // ─────────────────────────────────────────────
    window.addToCart = function (itemName) {
        const toast = document.getElementById('toast');
        toast.textContent = `${itemName} added to your cart.`;
        toast.classList.add('show');

        setTimeout(() => toast.classList.remove('show'), 3000);
    };

});
