/* Global */
const qs = (s, p = document) => p.querySelector(s);
const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));

/* Header nav */
const burger = qs('.burger');
const nav = qs('.nav');
if (burger) {
	burger.addEventListener('click', () => {
		const expanded = burger.getAttribute('aria-expanded') === 'true';
		burger.setAttribute('aria-expanded', String(!expanded));
		nav.style.display = expanded ? 'none' : 'flex';
	});
}

/* Smooth scroll */
qsa('a[href^="#"]').forEach(a => {
	a.addEventListener('click', e => {
		const id = a.getAttribute('href');
		if (id.length > 1) {
			e.preventDefault();
			const el = qs(id);
			if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
});

/* Year */
const yearEl = qs('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Cursor */
const cursor = qs('.cursor');
let cursorVisible = false;
window.addEventListener('mousemove', e => {
	cursorVisible = true;
	cursor.style.opacity = 1;
	cursor.style.left = e.clientX + 'px';
	cursor.style.top = e.clientY + 'px';
});
window.addEventListener('mouseout', () => { cursorVisible = false; cursor.style.opacity = 0; });

/* GSAP Animations */
window.addEventListener('DOMContentLoaded', () => {
	if (window.gsap) {
		gsap.registerPlugin(ScrollTrigger);

		// Split lines for titles (simple fade up)
		qsa('.split-lines').forEach(el => {
			gsap.from(el, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: { trigger: el, start: 'top 80%' }
			});
		});

		// Feature cards stagger
		const cards = qsa('.feature-card');
		if (cards.length) {
			gsap.to(cards, {
				y: 0,
				opacity: 1,
				stagger: 0.1,
				duration: 0.7,
				ease: 'power2.out',
				scrollTrigger: { trigger: qs('#features'), start: 'top 75%' }
			});
		}

		// Gallery items fade in
		const galleryItems = qsa('.gallery__item');
		if (galleryItems.length) {
			gsap.to(galleryItems, {
				y: 0,
				opacity: 1,
				stagger: 0.06,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: { trigger: qs('#gallery'), start: 'top 80%' }
			});
		}

		// Marquee continuous movement
		const track = qs('.marquee__track');
		if (track) {
			const width = track.scrollWidth;
			gsap.to(track, { x: () => -width / 2, repeat: -1, duration: 16, ease: 'none' });
		}

		// Parallax images
		qsa('.parallax').forEach(el => {
			const speed = parseFloat(el.dataset.speed || '0.2');
			gsap.to(el, {
				yPercent: () => speed * 100,
				ease: 'none',
				scrollTrigger: { trigger: el, scrub: true }
			});
		});
	}
});


