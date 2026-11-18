/* ===========================
   Initialize AOS Animations
=========================== */
AOS.init({
    duration: 1000,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
});

/* ===========================
   Particle Background (Hero)
=========================== */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 35; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            animation-duration: ${Math.random() * 10 + 8}s;
            animation-delay: ${Math.random() * 8}s;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        container.appendChild(p);
    }
}
createParticles();

/* ===========================
   Statistics Counter
=========================== */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const speed = target / 100;
        function update() {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        }
        update();
    });
}

// Trigger counter when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

/* ===========================
   Gallery Lightbox
=========================== */
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightboxClose');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

/* ===========================
   Back To Top Button
=========================== */
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
    if (topBtn) {
        topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    }
});

if (topBtn) {
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===========================
   Navbar Scroll Effect
=========================== */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

/* ===========================
   Active Nav Link on Scroll
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ===========================
   Mobile Hamburger Menu
=========================== */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinksEl.classList.toggle('open');
    });

    // Close on nav link click
    navLinksEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinksEl.classList.remove('open');
        });
    });
}

/* ===========================
   Contact Form (Formspree AJAX)
=========================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check if Formspree is configured
        const action = contactForm.action;
        if (action.includes('YOUR_FORM_ID')) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '⚠️ Formspree ID is not configured yet. Please follow the setup guide.';
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const data = new FormData(contactForm);
            const response = await fetch(action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = '✅ Message sent successfully! We will get back to you soon. God bless you! 🙏';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '❌ Failed to send message. Please try again or call us directly.';
        }

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

        // Hide status after 6 seconds
        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 6000);
    });
}

console.log('✝️ St. Francis Xavier\'s Church Website Loaded ❤️');