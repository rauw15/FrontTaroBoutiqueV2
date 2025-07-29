// Utilidad para smooth scroll personalizado
export const smoothScrollTo = (targetId, offset = 70) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const targetPosition = targetElement.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // Duración en milisegundos
  let startTime = null;

  // Función de easing para una animación más natural
  const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const ease = easeInOutQuart(progress);
    const currentPosition = startPosition + (distance * ease);
    
    window.scrollTo(0, currentPosition);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// Función que maneja navegación inteligente
export const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Verificar si estamos en la página principal
  const isHomePage = window.location.pathname === '/';
  
  if (isHomePage) {
    // Si estamos en home, hacer scroll suave
    smoothScrollTo(targetId);
  } else {
    // Si estamos en otra página, navegar a home con hash
    window.location.href = `/#${targetId}`;
  }
  
  return false;
};

// Función para manejar scroll después de cargar la página
export const handleHashScroll = () => {
  const hash = window.location.hash.substring(1); // Remover el #
  if (hash) {
    setTimeout(() => {
      smoothScrollTo(hash);
    }, 500); // Dar tiempo a que la página se cargue completamente
  }
}; 