// Efecto scroll-reveal del collage (mobile) usando IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const collage = document.querySelector('.collage');

  if (collage) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            collage.classList.add('visible');
          }
          // si quieres que se oculte de nuevo al salir de vista, descomenta:
          // else {
          //   collage.classList.remove('visible');
          // }
        });
      },
      {
        threshold: 0.2, // se activa cuando el 20% del collage es visible
      }
    );

    observer.observe(collage);
  }
});