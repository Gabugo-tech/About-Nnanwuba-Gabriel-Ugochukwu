const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('navbar');

const applyTheme = (theme) => {
  body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
};

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  applyTheme(storedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(nextTheme);
});

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const revealElements = document.querySelectorAll('.content-reveal, .visual-reveal, .animate-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

revealElements.forEach((element) => observer.observe(element));

const progressBars = document.querySelectorAll('.skill-bar__fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progress = entry.target.dataset.progress;
      entry.target.style.width = `${progress}%`;
      progressObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3,
});

progressBars.forEach((bar) => progressObserver.observe(bar));

const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});
