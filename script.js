const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
const projectSearch = document.getElementById('projectSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillsTabs = document.querySelectorAll('.skill-tab');
const skillsPanels = document.querySelectorAll('.skills-panel-item');
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
const typingText = document.getElementById('typingText');
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');

const typingPhrases = [
    'Full Stack Developer |',
    'Java & Spring Boot |',
    'React & MySQL |',
    'Problem Solver |'
];
let typingIndex = 0;
let letterIndex = 0;
let typingForward = true;

function updateCursorPosition(event) {
    const { clientX, clientY } = event;
    cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    cursorGlow.style.transform = `translate(${clientX}px, ${clientY}px)`;
}

document.addEventListener('mousemove', updateCursorPosition);

document.addEventListener('mouseover', (event) => {
    if (event.target.closest('a, button, .btn')) {
        cursor.style.transform += ' scale(1.2)';
    }
});

function typeEffect() {
    const current = typingPhrases[typingIndex];
    if (typingForward) {
        typingText.textContent = current.slice(0, letterIndex + 1);
        letterIndex++;
        if (letterIndex === current.length) {
            typingForward = false;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typingText.textContent = current.slice(0, letterIndex - 1);
        letterIndex--;
        if (letterIndex === 0) {
            typingForward = true;
            typingIndex = (typingIndex + 1) % typingPhrases.length;
        }
    }
    setTimeout(typeEffect, typingForward ? 100 : 40);
}

typeEffect();

function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach((el) => {
        const sectionTop = el.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

function highlightNavbar() {
    sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 110;
        const height = section.offsetHeight;
        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
            });
        }
    });
}

function updateNavbarStyle() {
    if (window.scrollY > 40) {
        document.querySelector('.topbar').classList.add('scrolled');
    } else {
        document.querySelector('.topbar').classList.remove('scrolled');
    }
}

window.addEventListener('scroll', () => {
    revealOnScroll();
    highlightNavbar();
    updateNavbarStyle();
});

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    });
});

projectSearch.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    projectCards.forEach((card) => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const text = card.querySelector('p').textContent.toLowerCase();
        const visible = title.includes(query) || text.includes(query);
        card.style.display = visible ? 'grid' : 'none';
    });
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        projectCards.forEach((card) => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

skillsTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        skillsTabs.forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        skillsPanels.forEach((panel) => {
            panel.classList.toggle('active', panel.dataset.panel === tab.dataset.tab);
        });
    });
});

function updateSkillProgress() {
    document.querySelectorAll('.skill-circle').forEach((circle) => {
        const value = circle.dataset.progress;
        circle.style.setProperty('--progress', `${value}%`);
    });
}

updateSkillProgress();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
        feedback.textContent = 'Please fill out all fields before sending.';
        feedback.style.color = '#ff8f8f';
        return;
    }

    feedback.textContent = 'Message sent successfully! I will get back to you soon.';
    feedback.style.color = '#70f7b5';
    form.reset();
});

function createParticles() {
    const container = document.getElementById('particle-bg');
    const count = 45;
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        const size = Math.random() * 4 + 3;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${Math.random() * 14 + 8}s`;
        dot.style.animationDelay = `${-Math.random() * 12}s`;
        dot.style.opacity = `${Math.random() * 0.65 + 0.25}`;
        container.appendChild(dot);
    }
}

createParticles();

// Initialize reveal state on load
window.addEventListener('load', revealOnScroll);
