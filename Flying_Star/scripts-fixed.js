document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', function () {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---------- CTA FORM SUBMISSION (Backend Email) ----------
    const ctaForm = document.getElementById('cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = ctaForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.textContent;
            const formMessage = document.getElementById('cta-form-message');

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formMessage.style.display = 'none';

            // Prepare payload for backend
            const payload = {
                name: ctaForm.querySelector('input[name="name"]').value.trim(),
                email: ctaForm.querySelector('input[name="email"]').value.trim(),
                phone: ctaForm.querySelector('input[name="phone"]').value.trim(),
                course: ctaForm.querySelector('select[name="course"]').value
            };

            try {
                const res = await fetch('/send-cta-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await res.json();
                if (res.ok && result.message) {
                    formMessage.style.color = 'green';
                    formMessage.innerHTML = '<i class="fas fa-check-circle"></i> ' + result.message;
                    ctaForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send application');
                }
            } catch (err) {
                formMessage.style.color = 'red';
                formMessage.innerHTML = `<i class="fas fa-times-circle"></i> ${err.message}`;
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = btnText;
                formMessage.style.display = 'block';
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    // Animate Elements on Scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate__animated');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Counter Animation
    const counterAnimation = function () {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(counterAnimation, 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Initialize counters when section is in view
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counterAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Placements Slider
    const placementsSlider = new Swiper('.placements-slider', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });

    // Testimonials Slider
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    // ---------- UPDATED FORM SUBMISSION (Backend Email) ----------
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const formMessage = document.getElementById('form-message');

            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            formMessage.style.display = 'none';

            // Prepare payload for backend
            const payload = {
                first_name: document.querySelector('#first-name').value.trim(),
                last_name: document.querySelector('#last-name').value.trim(),
                phone: document.querySelector('#phone').value.trim(),
                email: document.querySelector('#email').value.trim(),
                city: document.querySelector('#city').value,
                qualification: document.querySelector('#qualification').value.trim()
            };

            try {
                const res = await fetch('/send-form1', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await res.json();
                if (res.ok && result.message) {
                    formMessage.style.color = 'green';
                    formMessage.innerHTML = '<i class="fas fa-check-circle"></i> ' + result.message;
                    enquiryForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send enquiry');
                }
            } catch (err) {
                formMessage.style.color = 'red';
                formMessage.innerHTML = `<i class="fas fa-times-circle"></i> ${err.message}`;
            } finally {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                formMessage.style.display = 'block';
            }
        });
    }
});
