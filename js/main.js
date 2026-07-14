document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.collage-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, index * 150); // 150ms de diferencia entre cada celda
          });
          observer.disconnect(); // ya se activó, no necesitamos seguir observando
        }
      });
    },
    { threshold: 0.2 }
  );

  const collage = document.querySelector('.collage');
  if (collage) observer.observe(collage);
});