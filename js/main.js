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

// ===== Frase de conexión + Cuenta regresiva aparecen con scroll =====
const fraseConexion = document.getElementById('frase-conexion');
const cuentaRegresiva = document.getElementById('cuenta-regresiva');

const observerCountdown = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (fraseConexion) fraseConexion.classList.add('visible');
        setTimeout(() => {
          document.querySelectorAll('.countdown-box').forEach((box, i) => {
            setTimeout(() => box.classList.add('visible'), i * 150);
          });
        }, 400);
        observerCountdown.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

if (cuentaRegresiva) observerCountdown.observe(cuentaRegresiva);

// ===== Cuenta regresiva funcional =====
const fechaBoda = new Date('2027-10-11T17:00:00'); // 👈 ajusta la hora cuando la confirmes

function actualizarCountdown() {
  const ahora = new Date();
  const diferencia = fechaBoda - ahora;
  if (diferencia <= 0) return;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const seg = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById('cd-dias').textContent = String(dias).padStart(2, '0');
  document.getElementById('cd-horas').textContent = String(horas).padStart(2, '0');
  document.getElementById('cd-min').textContent = String(min).padStart(2, '0');
  document.getElementById('cd-seg').textContent = String(seg).padStart(2, '0');
}

setInterval(actualizarCountdown, 1000);
actualizarCountdown();

// ===== Guardar en Google Calendar =====
const btnGoogle = document.getElementById('btn-google-calendar');
if (btnGoogle) {
  btnGoogle.addEventListener('click', () => {
    const inicio = '20271011T170000';
    const fin = '20271011T230000';
    const titulo = encodeURIComponent('Boda de Ivie & Andrea');
    const detalles = encodeURIComponent('¡Nos casamos! Te esperamos para celebrar con nosotros.');
    const lugar = encodeURIComponent('Hard Rock Hotel Vallarta, Riviera Nayarit');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${inicio}/${fin}&details=${detalles}&location=${lugar}`;
    window.open(url, '_blank');
  });
}

// ===== Descargar .ics (Apple / Outlook) =====
const btnIcs = document.getElementById('btn-ics');
if (btnIcs) {
  btnIcs.addEventListener('click', () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'SUMMARY:Boda de Ivie & Andrea',
      'DTSTART:20271011T170000',
      'DTEND:20271011T230000',
      'LOCATION:Hard Rock Hotel Vallarta\\, Riviera Nayarit',
      'DESCRIPTION:¡Nos casamos! Te esperamos para celebrar con nosotros.',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Boda-Ivie-Andrea.ics';
    link.click();
  });
}