function animarTexto(elemento, delayEntreLetras = 80) {
  if (!elemento) return 0;
  const texto = elemento.textContent;
  elemento.textContent = '';
  const letras = texto.split('');
  letras.forEach((letra, i) => {
    const span = document.createElement('span');
    span.textContent = letra === ' ' ? '\u00A0' : letra;
    span.style.animationDelay = `${i * delayEntreLetras}ms`;
    span.classList.add('letra-animada');
    elemento.appendChild(span);
  });
  return letras.length * delayEntreLetras + 500;
}

document.addEventListener('DOMContentLoaded', () => {
  // "Save the date" se anima al cargar, y después el logo y el collage
  const saveTheDate = document.getElementById('save-the-date');
  const duracionSaveTheDate = animarTexto(saveTheDate, 80);

  const logo = document.querySelector('.logo-inicio');
  if (logo) {
    setTimeout(() => logo.classList.add('logo-visible'), duracionSaveTheDate);
  }

  // "Nuestros momentos" se anima al entrar en pantalla con scroll
  const tituloMomentos = document.getElementById('titulo-momentos');
  const observerTitulo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animarTexto(tituloMomentos, 60);
          observerTitulo.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  if (tituloMomentos) observerTitulo.observe(tituloMomentos);

  // Voltear tarjetas al tocarlas
  document.querySelectorAll('.tarjeta').forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
      tarjeta.classList.toggle('volteada');
    });
  });

  // Galería (fotos + números) aparece en cascada al hacer scroll
  const elementosGaleria = document.querySelectorAll('.tarjeta, .numero-fecha');
  const observerGaleria = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          elementosGaleria.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
          });
          observerGaleria.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  const galeria = document.querySelector('.galeria');
  if (galeria) observerGaleria.observe(galeria);
});