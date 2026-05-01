document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }));

  // Sticky Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll Animations (Intersection Observer)
  const observeElements = document.querySelectorAll('.fade-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  observeElements.forEach(el => observer.observe(el));

  const workCarousel = document.querySelector('.work-carousel');

  if (workCarousel) {
    const track = workCarousel.querySelector('.work-carousel__track');
    const slides = Array.from(workCarousel.querySelectorAll('.work-carousel__slide'));
    const prevButton = workCarousel.querySelector('.work-carousel__button--prev');
    const nextButton = workCarousel.querySelector('.work-carousel__button--next');
    const dots = Array.from(workCarousel.querySelectorAll('.work-carousel__dots button'));
    let currentIndex = 0;
    let autoPlayId;

    const updateCarousel = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('current-slide', slideIndex === currentIndex);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === currentIndex);
      });
    };

    const startAutoPlay = () => {
      autoPlayId = window.setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 4500);
    };

    const resetAutoPlay = () => {
      window.clearInterval(autoPlayId);
      startAutoPlay();
    };

    prevButton.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
      resetAutoPlay();
    });

    nextButton.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
      resetAutoPlay();
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        updateCarousel(dotIndex);
        resetAutoPlay();
      });
    });

    workCarousel.addEventListener('mouseenter', () => window.clearInterval(autoPlayId));
    workCarousel.addEventListener('mouseleave', startAutoPlay);

    updateCarousel(0);
    startAutoPlay();
  }

  const projectCards = document.querySelectorAll('.project-card');
  const lightbox = document.querySelector('.project-lightbox');

  if (projectCards.length && lightbox) {
    const lightboxImage = lightbox.querySelector('.project-lightbox__image');
    const lightboxTitle = lightbox.querySelector('#project-lightbox-title');
    const lightboxDescription = lightbox.querySelector('.project-lightbox__caption p');
    const closeButton = lightbox.querySelector('.project-lightbox__close');
    const backdrop = lightbox.querySelector('.project-lightbox__backdrop');
    let activeCard = null;

    const openLightbox = (card) => {
      const image = card.querySelector('img');
      const title = card.querySelector('.project-title');
      const description = card.querySelector('.project-desc');

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxTitle.textContent = title ? title.textContent : image.alt;
      lightboxDescription.textContent = description ? description.textContent : '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      activeCard = card;
      closeButton.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      lightboxImage.src = '';
      lightboxImage.alt = '';

      if (activeCard) {
        activeCard.focus();
        activeCard = null;
      }
    };

    projectCards.forEach((card) => {
      card.addEventListener('click', () => openLightbox(card));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(card);
        }
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }
});
