const GALLERY_CONFIG = {
  folder: 'gallery',
  repo: { owner: 'NotGalacticFire', name: 'h4h', branch: 'main' },
  fallbackFiles: [
    './0.jpg', './1.jpg', './2.jpg', './3.jpg', './4.jpg',
    './5.jpg', './6.jpg', './7.jpg', './8.jpg', './9.jpg',
    './Aria.jpg', './Amy-Alaniz.jpg', './Avanish.jpg', './Donate.jpg'
  ]
};

let galleryImages = [];
let carouselIndex = 0;
let carouselTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  initGalleryPage().catch(err => console.error('Gallery init failed:', err));
});

async function initGalleryPage() {
  galleryImages = await loadGalleryImages();

  if (!galleryImages.length) {
    renderEmptyGallery();
    return;
  }

  renderCarousel(galleryImages);
  renderMasonry(galleryImages);
  wireShuffle(galleryImages);
  setupLightbox();
}

async function loadGalleryImages() {
  const loaders = [loadFromManifest, loadFromDirectoryListing, loadFromGitHub];

  for (const loader of loaders) {
    try {
      const results = await loader();
      if (results && results.length) return results;
    } catch (error) {
      console.warn(`${loader.name} failed:`, error.message || error);
    }
  }

  return GALLERY_CONFIG.fallbackFiles.map(resolveImagePath);
}

async function loadFromManifest() {
  try {
    const res = await fetch(`${GALLERY_CONFIG.folder}/manifest.json?ts=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    const images = Array.isArray(data) ? data : data.images;
    if (!images || !images.length) return [];
    return images.filter(isSupportedImage).map(resolveImagePath);
  } catch {
    return [];
  }
}

async function loadFromDirectoryListing() {
  // Works when the server exposes directory listings (e.g., local dev server)
  try {
    const res = await fetch(`${GALLERY_CONFIG.folder}/`);
    if (!res.ok || !res.headers.get('content-type')?.includes('text/html')) return [];
    const html = await res.text();
    const matches = [...html.matchAll(/href="([^"]+\.(?:jpe?g|png|gif|webp))"/gi)];
    if (!matches.length) return [];
    return matches.map(match => resolveImagePath(match[1]));
  } catch {
    return [];
  }
}

async function loadFromGitHub() {
  const { owner, name, branch } = GALLERY_CONFIG.repo;
  const url = `https://api.github.com/repos/${owner}/${name}/contents/${encodeURIComponent(GALLERY_CONFIG.folder)}?ref=${branch}`;
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) return [];
  const payload = await res.json();
  return (payload || [])
    .filter(item => item.type === 'file' && isSupportedImage(item.name))
    .map(item => item.download_url || item.url)
    .map(src => `${src}${src.includes('?') ? '&' : '?'}raw=1`);
}

function isSupportedImage(src) {
  return /\.(jpe?g|png|gif|webp)$/i.test(src);
}

function resolveImagePath(src) {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith('./') || src.startsWith('../')) return src;
  if (src.startsWith(`${GALLERY_CONFIG.folder}/`)) return src;
  if (src.startsWith('/')) return src;
  return `${GALLERY_CONFIG.folder}/${src}`;
}

function renderCarousel(images) {
  const track = document.getElementById('gallery-carousel');
  const dots = document.getElementById('carousel-dots');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (!track || !dots) return;

  track.innerHTML = '';
  dots.innerHTML = '';

  const slides = images.slice(0, Math.min(images.length, 12));
  slides.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
      <img src="${src}" alt="Gallery photo ${index + 1}" loading="lazy" decoding="async">
      <div class="slide-overlay"></div>
      <div class="slide-caption">
        <div class="note">Gallery spotlight</div>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dots.appendChild(dot);
  });

  carouselIndex = 0;
  updateCarousel(track, dots, slides.length);

  if (prevBtn) {
    const freshPrev = prevBtn.cloneNode(true);
    prevBtn.replaceWith(freshPrev);
    freshPrev.addEventListener('click', () => goToSlide(carouselIndex - 1));
  }
  if (nextBtn) {
    const freshNext = nextBtn.cloneNode(true);
    nextBtn.replaceWith(freshNext);
    freshNext.addEventListener('click', () => goToSlide(carouselIndex + 1));
  }

  const shell = document.querySelector('.carousel-shell');
  shell?.addEventListener('mouseenter', pauseCarousel);
  shell?.addEventListener('mouseleave', resumeCarousel);
  resumeCarousel();
}

function goToSlide(index) {
  const track = document.getElementById('gallery-carousel');
  const dots = document.getElementById('carousel-dots');
  if (!track || !dots.children.length) return;

  const total = dots.children.length;
  carouselIndex = (index + total) % total;
  updateCarousel(track, dots, total);
}

function updateCarousel(track, dots, total) {
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  [...dots.children].forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIndex);
  });
}

function pauseCarousel() {
  if (carouselTimer) clearInterval(carouselTimer);
}

function resumeCarousel() {
  pauseCarousel();
  const dots = document.getElementById('carousel-dots');
  if (!dots || !dots.children.length) return;
  carouselTimer = setInterval(() => goToSlide(carouselIndex + 1), 3800);
}

function renderMasonry(images) {
  const grid = document.getElementById('gallery-masonry');
  if (!grid) return;
  grid.innerHTML = '';

  const frag = document.createDocumentFragment();
  images.forEach((src, idx) => {
    const card = document.createElement('figure');
    card.className = 'masonry-card';
    const altText = `Gallery photo ${idx + 1}`;
    card.innerHTML = `
      <img src="${src}" alt="${altText}" loading="lazy" decoding="async">
    `;
    card.addEventListener('click', () => openLightbox(src, altText));
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

function renderEmptyGallery() {
  const grid = document.getElementById('gallery-masonry');
  if (!grid) return;
  grid.innerHTML = `
    <div class="empty-state">
      <div class="eyebrow">No photos yet</div>
      <p>Drop images inside the ${GALLERY_CONFIG.folder}/ folder to display them here.</p>
    </div>
  `;
}

function wireShuffle(images) {
  const shuffleBtn = document.getElementById('shuffle-gallery');
  if (!shuffleBtn) return;
  shuffleBtn.addEventListener('click', () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    renderCarousel(shuffled);
    renderMasonry(shuffled);
  });
}

let lightboxEl = null;
let lightboxImg = null;
let lightboxCaption = null;

function setupLightbox() {
  lightboxEl = document.getElementById('gallery-lightbox');
  lightboxImg = document.getElementById('lightbox-image');
  lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  closeBtn?.addEventListener('click', closeLightbox);
  lightboxEl?.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(src, altText) {
  if (!lightboxEl || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = altText || 'Gallery photo';
  if (lightboxCaption) lightboxCaption.textContent = '';
  lightboxEl.classList.add('active');
}

function closeLightbox() {
  lightboxEl?.classList.remove('active');
}
