AOS.init({
  duration: 600,
  once: true,
});

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('save-the-date');
  if (el) {
    const texto = el.textContent;
    el.textContent = '';

    const letras = texto.split('');
    letras.forEach((letra, i) => {
      const span = document.createElement('span');
      span.textContent = letra === ' ' ? '\u00A0' : letra;
      span.style.animationDelay = `${i * 80}ms`;
      span.classList.add('letra-animada');
      el.appendChild(span);
    });

    // El logo aparece cuando termina de "escribirse" el texto
    const duracionTotal = letras.length * 80 + 500;
    const logo = document.querySelector('.logo-inicio');
    if (logo) {
      setTimeout(() => {
        logo.classList.add('logo-visible');
      }, duracionTotal);
    }
  }
});

setTimeout(() => {
  const collage = document.querySelector('.collage');
  if (collage) {
    collage.classList.add('visible');
  }
}, 8000);