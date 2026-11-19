const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');
const yearField = document.getElementById('year');

if (yearField) {
  yearField.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get('nome') || '').trim();
  const surname = String(formData.get('cognome') || '').trim();
  const company = String(formData.get('azienda') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('messaggio') || '').trim();
  const success = document.getElementById('formSuccess');

  if (!name || !surname || !company || !email || !message) {
    success.textContent = 'Completa tutti i campi richiesti prima di inviare la richiesta.';
    success.style.color = '#d65a4c';
    return;
  }

  success.textContent = 'Grazie! La tua richiesta è stata inviata correttamente. Ti contatteremo al più presto.';
  success.style.color = '#1a8f6a';
  contactForm.reset();
});
