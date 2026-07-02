const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const buttons = Array.from(document.querySelectorAll('.gallery__button'));
const lightbox = document.querySelector('#lightbox');
const image = document.querySelector('[data-lightbox-image]');
const caption = document.querySelector('[data-lightbox-caption]');
const closeButton = document.querySelector('[data-close]');
const previousButton = document.querySelector('[data-prev]');
const nextButton = document.querySelector('[data-next]');
let currentIndex = 0;

function showImage(index) {
  if (!lightbox || !image || !caption || buttons.length === 0) return;
  currentIndex = (index + buttons.length) % buttons.length;
  const selected = buttons[currentIndex];
  image.src = selected.dataset.full || '';
  image.alt = selected.querySelector('img')?.alt || selected.dataset.title || 'Foto do portfólio Diaz';
  caption.textContent = `${selected.dataset.title || 'Foto'} | ${currentIndex + 1} de ${buttons.length}`;
}

function openLightbox(index) {
  if (!lightbox) return;
  showImage(index);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  closeButton?.focus();
}

function closeLightbox() {
  if (!lightbox || !image) return;
  lightbox.hidden = true;
  image.src = '';
  document.body.style.overflow = '';
  buttons[currentIndex]?.focus();
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => openLightbox(index));
});

closeButton?.addEventListener('click', closeLightbox);
previousButton?.addEventListener('click', () => showImage(currentIndex - 1));
nextButton?.addEventListener('click', () => showImage(currentIndex + 1));

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox || lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});


// WhatsApp contact menu
const whatsappMenu = document.querySelector('[data-whatsapp-menu]');
const whatsappToggle = document.querySelector('[data-whatsapp-toggle]');
const whatsappOptions = document.querySelector('[data-whatsapp-options]');
const whatsappLinks = Array.from(document.querySelectorAll('[data-whatsapp-phone]'));

function getWhatsappGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function getWhatsappUrl(phone, name) {
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  if (cleanPhone.length < 12) return '';
  const contactName = name || 'Diaz Fotografia';
  const message = `${getWhatsappGreeting()}, aqui é ${contactName}. Em que posso te ajudar?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

function closeWhatsappMenu() {
  if (!whatsappToggle || !whatsappOptions) return;
  whatsappOptions.hidden = true;
  whatsappToggle.setAttribute('aria-expanded', 'false');
}

if (whatsappToggle && whatsappOptions) {
  whatsappToggle.addEventListener('click', () => {
    const isOpen = whatsappOptions.hidden;
    whatsappOptions.hidden = !isOpen;
    whatsappToggle.setAttribute('aria-expanded', String(isOpen));
  });

  whatsappLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const phone = link.dataset.whatsappPhone;
      const name = link.dataset.whatsappName;
      const url = getWhatsappUrl(phone, name);
      if (!url) {
        alert('WhatsApp ainda não configurado. Informe os dois números reais no arquivo do site.');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
      closeWhatsappMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (whatsappMenu && !whatsappMenu.contains(event.target)) closeWhatsappMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeWhatsappMenu();
  });
}



// Construction popup
const constructionModal = document.querySelector('[data-construction-modal]');
const constructionOpen = document.querySelector('[data-construction-open]');
const constructionClose = document.querySelector('[data-construction-close]');

function openConstructionModal() {
  if (!constructionModal) return;
  constructionModal.hidden = false;
  document.body.style.overflow = 'hidden';
  constructionClose?.focus();
}

function closeConstructionModal() {
  if (!constructionModal) return;
  constructionModal.hidden = true;
  document.body.style.overflow = '';
  constructionOpen?.focus();
}

constructionOpen?.addEventListener('click', openConstructionModal);
constructionClose?.addEventListener('click', closeConstructionModal);

constructionModal?.addEventListener('click', (event) => {
  if (event.target === constructionModal) closeConstructionModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && constructionModal && !constructionModal.hidden) closeConstructionModal();
});
