// Header scroll shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-close').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});


// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
    });
});


// ── Carrusel infinito ──
// (function () {
//     const track = document.getElementById('carouselTrack');
//     const prev = document.getElementById('carouselPrev');
//     const next = document.getElementById('carouselNext');
//     const dots = document.querySelectorAll('.cdot');
//     const cards = Array.from(document.querySelectorAll('.carousel-card'));
//     const total = cards.length;
//     let current = 0;
//     let startX = 0;
//     let isMoving = false;

//     // Clonar para loop infinito
//     cards.forEach(c => track.append(c.cloneNode(true)));
//     cards.forEach(c => track.prepend(c.cloneNode(true)));
//     // Ahora el track tiene: [4 clones fin] [4 originales] [4 clones inicio]
//     // El offset inicial es `total` (saltamos los clones del principio)
//     let pos = total; // posición real en el track

//     function getCardW() {
//         return track.children[0].offsetWidth + 24;
//     }

//     function setPos(index, animate) {
//         track.style.transition = animate ? 'transform .4s cubic-bezier(.4,0,.2,1)' : 'none';
//         track.style.transform = `translateX(-${index * getCardW()}px)`;
//     }

//     function goTo(dir) {
//         if (isMoving) return;
//         isMoving = true;
//         pos += dir;
//         current = ((current + dir) % total + total) % total;
//         setPos(pos, true);
//         dots.forEach((d, i) => d.classList.toggle('active', i === current));
//     }

//     track.addEventListener('transitionend', () => {
//         isMoving = false;
//         // Si llegamos a los clones del final, saltar a los originales
//         if (pos >= total * 2) {
//             pos = total;
//             setPos(pos, false);
//         }
//         // Si llegamos a los clones del inicio, saltar a los originales
//         if (pos <= 0) {
//             pos = total;
//             setPos(pos, false);
//         }
//     });

//     prev.addEventListener('click', () => goTo(-1));
//     next.addEventListener('click', () => goTo(1));
//     dots.forEach(d => d.addEventListener('click', () => {
//         const target = +d.dataset.index;
//         const dir = target - current;
//         if (dir !== 0) goTo(dir);
//     }));

//     // Swipe
//     track.addEventListener('pointerdown', e => {
//         startX = e.clientX;
//         track.setPointerCapture(e.pointerId);
//     });
//     track.addEventListener('pointerup', e => {
//         const diff = startX - e.clientX;
//         if (Math.abs(diff) > 50) goTo(diff > 0 ? 1 : -1);
//     });

//     // Autoplay
//     setInterval(() => goTo(1), 4000);

//     // Init: esperar un frame para que el DOM esté pintado
//     requestAnimationFrame(() => {
//         setPos(pos, false);
//     });
// })();

