/**
 * ============================================================
 * PRATIKHYA'S BIRTHDAY WEBSITE — script.js
 * Features: Confetti, Gallery, Lightbox, Surprise, Music,
 *           Scroll Reveal, Floating Animations, Nav
 * ============================================================
 */

/* ============================================================
   1. GALLERY DATA — Photo placeholder with categories
   Add your real photo paths in the `src` fields below.
   ============================================================ */
const GALLERY_PHOTOS = [
  // Fun Times
  { id: 1, src: 'photos/photo1.jpg', category: 'fun', color: '#FFB6C1' },
  { id: 2, src: 'photos/photo2.jpg', category: 'fun', color: '#C8B6E2' },
  { id: 3, src: 'photos/photo3.jpg', category: 'fun', color: '#AED9E0' },
  { id: 4, src: 'photos/photo4.jpg', category: 'fun', color: '#FFCBA4' },
  { id: 5, src: 'photos/photo5.jpg', category: 'fun', color: '#FFF176' },
  // Hangouts
  { id: 6, src: 'photos/photo6.jpg', category: 'hangout', color: '#FFB6C1' },
  { id: 7, src: 'photos/photo7.jpg', category: 'hangout', color: '#C8B6E2' },
  { id: 8, src: 'photos/photo8.jpg', category: 'hangout', color: '#AED9E0' },
  { id: 9, src: 'photos/photo9.jpg', category: 'hangout', color: '#FFCBA4' },
  { id: 10, src: 'photos/photo10.jpg', category: 'hangout', color: '#FFC0CB' },
  { id: 11, src: 'photos/photo11.jpg', category: 'hangout', color: '#B0E0E6' },
  { id: 12, src: 'photos/photo12.jpg', category: 'hangout', color: '#DDA0DD' },
  // Special Days
  { id: 13, src: 'photos/photo13.jpg', category: 'special', color: '#FFB6C1' },
  { id: 14, src: 'photos/photo14.jpg', category: 'special', color: '#C8B6E2' },
  { id: 15, src: 'photos/photo15.jpg', category: 'special', color: '#AED9E0' },
  { id: 16, src: 'photos/photo16.jpg', category: 'special', color: '#FFCBA4' },
  { id: 17, src: 'photos/photo17.jpg', category: 'special', color: '#B5EAD7' },
  { id: 18, src: 'photos/photo18.jpg', category: 'special', color: '#FF9AA2' },
  // More fun
  { id: 19, src: 'photos/photo19.jpg', category: 'fun', color: '#C7CEEA' },
  { id: 20, src: 'photos/photo20.jpg', category: 'fun', color: '#FFDAC1' },
  { id: 21, src: 'photos/photo21.jpg', category: 'fun', color: '#B5EAD7' },
  { id: 22, src: 'photos/photo22.jpg', category: 'hangout', color: '#FFB7B2' },
  { id: 23, src: 'photos/photo23.jpg', category: 'hangout', color: '#FFDAC1' },
  { id: 24, src: 'photos/photo24.jpg', category: 'hangout', color: '#C7CEEA' },
  { id: 25, src: 'photos/photo25.jpg', category: 'special', color: '#B5EAD7' },
  // Fill up to 30
  { id: 26, src: 'photos/photo26.jpg', category: 'fun', color: '#E2B6CF' },
  { id: 27, src: 'photos/photo27.jpg', category: 'special', color: '#AED9E0' },
  { id: 28, src: 'photos/photo28.jpg', category: 'hangout', color: '#FFCBA4' },
  { id: 29, src: 'photos/photo29.jpg', category: 'fun', color: '#C8B6E2' },
  { id: 30, src: 'photos/photo30.jpg', category: 'special', color: '#FFB6C1' },
];

/* ============================================================
   2. UTILITY HELPERS
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   3. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ============================================================
   4. NAVBAR — Scroll shrink & hamburger
   ============================================================ */
function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobileNav');
  const mobileLinks = $$('.mobile-nav-link');

  // Scroll shrink
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

/* ============================================================
   5. SCROLL REVEAL ANIMATION
   ============================================================ */
function initScrollReveal() {
  const revealEls = $$('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4, .reveal-delay-5');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================================
   6. CONFETTI — Page load celebration
   ============================================================ */
function initConfetti() {
  const canvas = $('#confettiCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const COLORS = ['#FFB6C1', '#C8B6E2', '#AED9E0', '#FFCBA4', '#FFF176', '#FF8FAB', '#9B72CF', '#6BBFD4', '#FF9966', '#B5EAD7'];
  const SHAPES = ['circle', 'rect', 'triangle'];

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * -canvas.height : -20;
      this.w = Math.random() * 10 + 5;
      this.h = this.w * (Math.random() * 0.5 + 0.5);
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      this.speed = Math.random() * 3 + 1.5;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.15;
      this.drift = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.7 + 0.3;
    }

    update() {
      this.y += this.speed;
      this.x += this.drift;
      this.angle += this.spin;
      if (this.y > canvas.height + 20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      switch (this.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, this.w / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'rect':
          ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -this.h / 2);
          ctx.lineTo(this.w / 2, this.h / 2);
          ctx.lineTo(-this.w / 2, this.h / 2);
          ctx.closePath();
          ctx.fill();
          break;
      }

      ctx.restore();
    }
  }

  // Generate particles
  const PARTICLE_COUNT = Math.min(120, Math.floor(window.innerWidth / 8));
  const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

  let frame = 0;
  const MAX_FRAMES = 500; // ~8 seconds at 60fps then stop

  function animate() {
    if (frame > MAX_FRAMES) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    frame++;
    requestAnimationFrame(animate);
  }

  animate();
}

/* Burst confetti on surprise */
function burstConfetti(duration = 300) {
  const canvas = $('#confettiCanvas');
  const ctx = canvas.getContext('2d');
  const COLORS = ['#FFB6C1', '#C8B6E2', '#AED9E0', '#FFCBA4', '#FF8FAB', '#9B72CF', '#FFF176'];

  const particles = Array.from({ length: 80 }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 16,
    vy: (Math.random() - 0.5) * 16 - 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    life: 1,
    decay: Math.random() * 0.02 + 0.01,
  }));

  function draw() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy + 0.3;
      p.life -= p.decay;
      if (p.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    if (particles.some(p => p.life > 0)) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}

/* ============================================================
   7. GALLERY — Build grid, filter, lightbox
   ============================================================ */
function initGallery() {
  const grid = $('#galleryGrid');
  const tabs = $$('.gallery-tab');
  const lightbox = $('#lightbox');
  const lbImg = $('#lightboxImg');
  const lbCap = $('#lightboxCaption');
  const lbClose = $('#lightboxClose');
  const lbPrev = $('#lightboxPrev');
  const lbNext = $('#lightboxNext');

  let currentFilter = 'all';
  let filteredPhotos = [...GALLERY_PHOTOS];
  let currentIndex = 0;

  // Build placeholder color gradient image URL
  function photoSrc(photo) {
    // Return the actual path; if file not found, show a stylized placeholder
    return photo.src;
  }

  function buildGrid(photos) {
    grid.innerHTML = '';
    photos.forEach((photo, idx) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.index = idx;
      item.style.animationDelay = (idx * 0.04) + 's';

      item.innerHTML = `
        <img
          src="${photoSrc(photo)}"
          alt="Photo ${photo.id}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.querySelector('.gallery-fallback').style.display='flex';"
        />
        <!-- Fallback if image not found -->
        <div class="gallery-fallback" style="
          display:none; width:100%; height:100%; position:absolute; inset:0;
          background:linear-gradient(135deg, ${photo.color}88, ${photo.color}44);
          align-items:center; justify-content:center; flex-direction:column; gap:8px;
          font-size:2rem;
        ">
          <span>📸</span>
        </div>
        <div class="gallery-item-zoom">🔍</div>
      `;

      item.addEventListener('click', () => openLightbox(idx));
      grid.appendChild(item);
    });
  }

  // Filter
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;

      filteredPhotos = currentFilter === 'all'
        ? [...GALLERY_PHOTOS]
        : GALLERY_PHOTOS.filter(p => p.category === currentFilter);

      buildGrid(filteredPhotos);
    });
  });

  // Lightbox
  function openLightbox(idx) {
    currentIndex = idx;
    const photo = filteredPhotos[idx];
    lbImg.src = photoSrc(photo);
    lbCap.textContent = '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + filteredPhotos.length) % filteredPhotos.length;
    const photo = filteredPhotos[currentIndex];
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
      lbImg.src = photoSrc(photo);
      lbCap.textContent = '';
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'scale(1)';
    }, 150);
  }

  lbImg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Initial build
  buildGrid(filteredPhotos);
}

/* ============================================================
   8. VIDEO PLACEHOLDERS — open modal on click
   ============================================================ */
function initVideos() {
  const modal = $('#videoModal');
  const modalClose = $('#videoModalClose');
  const modalInner = $('#videoModalInner');

  const videoData = {
    v1: { title: 'Our Best Moments 🎊', emoji: '🎊' },
    v2: { title: 'Birthday Celebration 🎂', emoji: '🎂' },
    v3: { title: 'Random Laughs 😂', emoji: '😂' },
    v4: { title: 'Friendship Forever 🌸', emoji: '🌸' },
    v5: { title: 'Adventures Together 🌟', emoji: '🌟' },
  };

  $$('.video-placeholder').forEach(ph => {
    ph.addEventListener('click', () => {
      const vId = ph.dataset.video;
      const info = videoData[vId] || { title: 'Video', emoji: '🎬' };

      // If you add real video files, replace the innerHTML below with:
      // <video controls autoplay style="width:100%;height:100%;">
      //   <source src="videos/${vId}.mp4" type="video/mp4" />
      // </video>

      modalInner.innerHTML = `
        <div style="text-align:center; padding:30px; color:rgba(255,255,255,0.8);">
          <div style="font-size:4rem; margin-bottom:16px;">${info.emoji}</div>
          <h3 style="font-size:1.3rem; margin-bottom:12px; color:#fff;">${info.title}</h3>
          <p style="font-size:0.9rem; line-height:1.7; color:rgba(255,255,255,0.55);">
            📁 Add your video file to the <code style="background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:6px;">videos/</code> folder<br/>
            and update the <code style="background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:6px;">index.html</code> with the video source.
          </p>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalInner.innerHTML = '<p class="video-placeholder-msg">🎬 Add your video file here!<br><small>Replace the placeholder in index.html with your video source.</small></p>';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
}

/* ============================================================
   9. MUSIC PLAYER
   ============================================================ */
function initMusicPlayer() {
  const btn = $('#musicToggle');
  const audio = $('#bgMusic');
  const label = btn.querySelector('.music-label');
  const icon = btn.querySelector('.music-icon');

  audio.volume = 0.4;

  function setPlayingState() {
    btn.classList.add('playing');
    if (label) label.textContent = 'Pause Music';
    icon.textContent = '🎶';
  }

  function setPausedState() {
    btn.classList.remove('playing');
    if (label) label.textContent = 'Play Music';
    icon.textContent = '🎵';
  }

  // Attempt autoplay on page load
  audio.play().then(() => {
    setPlayingState();
  }).catch(() => {
    // Browser blocked autoplay — start on first user interaction
    const startOnInteraction = () => {
      audio.play().then(() => setPlayingState()).catch(() => { });
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('scroll', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
    };
    document.addEventListener('click', startOnInteraction, { once: true });
    document.addEventListener('scroll', startOnInteraction, { once: true });
    document.addEventListener('keydown', startOnInteraction, { once: true });
    document.addEventListener('touchstart', startOnInteraction, { once: true });
  });

  // Manual toggle button
  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => setPlayingState()).catch(() => { });
    } else {
      audio.pause();
      setPausedState();
    }
  });
}


/* ============================================================
   10. SURPRISE BUTTON
   ============================================================ */
function initSurprise() {
  const btn = $('#surpriseBtn');
  const message = $('#surpriseMessage');
  const box = $('#surpriseBox');
  const starsWrap = $('#surpriseStars');
  const emojiBurst = $('#emojiBurst');

  const STAR_EMOJIS = ['✨', '🌟', '⭐', '💫', '🌸', '🎀', '🎊', '🎉', '🌈'];
  const BURST_EMOJIS = ['🎉', '🎊', '🌟', '🌸', '🎀', '✨', '🎶', '🎂'];

  function createStarParticles() {
    starsWrap.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const star = document.createElement('span');
      star.className = 'surprise-star';
      star.textContent = STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)];
      star.style.cssText = `
        left:${Math.random() * 90 + 5}%;
        top:${Math.random() * 90 + 5}%;
        font-size:${Math.random() * 1.5 + 0.8}rem;
        animation-delay:${Math.random() * 2}s;
        animation-duration:${Math.random() * 1.5 + 1.5}s;
      `;
      starsWrap.appendChild(star);
    }
  }

  function createEmojiBurst() {
    emojiBurst.textContent = '';
    const chosen = [...BURST_EMOJIS].sort(() => 0.5 - Math.random()).slice(0, 5);
    emojiBurst.textContent = chosen.join(' ');
  }

  btn.addEventListener('click', () => {
    if (message.classList.contains('show')) return;

    // Open the gift box
    box.classList.add('opened');

    // Trigger confetti burst
    burstConfetti();

    // Build dynamic content
    createStarParticles();
    createEmojiBurst();

    // Show the message
    setTimeout(() => {
      message.classList.add('show');
      message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 600);

    // Disable button
    btn.style.opacity = '0.5';
    btn.style.pointerEvents = 'none';
    btn.querySelector('.btn-text').textContent = '🎁 Surprise Revealed!';
  });
}

/* ============================================================
   11. SPARKLE BACKGROUND DOTS
   ============================================================ */
function initSparkles() {
  const overlay = document.createElement('div');
  overlay.className = 'sparkle-overlay';
  document.body.appendChild(overlay);

  const SPARKLE_COLORS = ['#C8B6E2', '#FFB6C1', '#AED9E0', '#FFCBA4', '#9B72CF'];
  const count = Math.min(30, Math.floor(window.innerWidth / 40));

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle-dot';
    dot.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      background:${SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]};
      animation-delay:${Math.random() * 4}s;
      animation-duration:${Math.random() * 2 + 3}s;
      width:${Math.random() * 5 + 3}px;
      height:${Math.random() * 5 + 3}px;
    `;
    overlay.appendChild(dot);
  }
}

/* ============================================================
   12. SMOOTH SCROLL for nav links
   ============================================================ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   13. TYPING / CURSOR EFFECT on hero name
   ============================================================ */
function initTypingEffect() {
  // Already animated via CSS; add a blinking cursor after the name
  const nameEl = document.querySelector('.title-name');
  if (!nameEl) return;

  // Make name visible with a glow pulse via JS (handled in CSS animation)
  // Optional: add character-by-character reveal
}

/* ============================================================
   14. ACTIVE NAV LINK on scroll
   ============================================================ */
function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--lavender-deep)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
}

/* ============================================================
   15. COUNTER — Animated stats (friendship counter)
   ============================================================ */
function initStats() {
  // Small animated friendship stats visible in message section
  const messageSection = $('#message');
  if (!messageSection) return;

  const statsHtml = `
    <div class="friendship-stats reveal" style="
      display:flex; flex-wrap:wrap; justify-content:center; gap:20px;
      margin:40px auto; max-width:600px;
    ">
      ${[
      { icon: '😂', label: 'Laughs Together', value: '∞' },
      { icon: '🌟', label: 'Memories Made', value: '100+' },
      { icon: '🤝', label: 'Years of Friendship', value: '💛' },
      { icon: '🌸', label: 'Moments Treasured', value: 'Always' },
    ].map(s => `
        <div style="
          background:linear-gradient(135deg,rgba(255,255,255,0.9),rgba(243,238,255,0.7));
          border:1px solid var(--border);
          border-radius:18px;
          padding:20px 28px;
          text-align:center;
          min-width:120px;
          box-shadow:0 6px 20px var(--shadow);
          transition:var(--transition);
        " onmouseenter="this.style.transform='translateY(-4px)'" onmouseleave="this.style.transform=''">
          <div style="font-size:2rem;margin-bottom:6px;">${s.icon}</div>
          <div style="font-size:1.4rem;font-weight:700;color:var(--lavender-deep);margin-bottom:4px;">${s.value}</div>
          <div style="font-size:0.75rem;color:var(--text-light);font-weight:500;">${s.label}</div>
        </div>
      `).join('')}
    </div>
  `;

  const msgCard = messageSection.querySelector('.message-card');
  if (msgCard) {
    const div = document.createElement('div');
    div.innerHTML = statsHtml;
    messageSection.querySelector('.message-container').insertBefore(div.firstElementChild, messageSection.querySelector('.memory-timeline'));
  }
}

/* ============================================================
   16. MAIN INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // ---- Splash overlay → triggers music on enter ----
  const splashOverlay = $('#splashOverlay');
  const splashBtn     = $('#splashBtn');

  if (splashBtn) {
    splashBtn.addEventListener('click', () => {
      // Hide splash with fade
      splashOverlay.classList.add('hidden');

      // Start music — this is a real user gesture, so browsers WILL allow it
      const audio     = $('#bgMusic');
      const musicBtn  = $('#musicToggle');
      const label     = musicBtn && musicBtn.querySelector('.music-label');
      const icon      = musicBtn && musicBtn.querySelector('.music-icon');

      audio.play().then(() => {
        if (musicBtn) musicBtn.classList.add('playing');
        if (label) label.textContent = 'Pause Music';
        if (icon)  icon.textContent  = '🎶';
      }).catch(() => {});
    });
  }

  initScrollProgress();
  initNavbar();
  initScrollReveal();
  initConfetti();
  initGallery();
  initVideos();
  initMusicPlayer();
  initSurprise();
  initSparkles();
  initSmoothScroll();
  initActiveNav();
  initStats();

  // Trigger reveal for elements already in view
  setTimeout(() => {
    $$('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4, .reveal-delay-5').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);

  console.log('%c🎉 Happy Birthday Pratikhya Sahoo! 🎉', 'color:#9B72CF;font-size:1.2rem;font-weight:bold;');
});

/* ============================================================
   17. PAGE VISIBILITY — Pause music when tab hidden
   ============================================================ */
document.addEventListener('visibilitychange', () => {
  const audio = $('#bgMusic');
  if (document.hidden && audio && !audio.paused) {
    audio.pause();
    const btn = $('#musicToggle');
    const label = btn && btn.querySelector('.music-label');
    if (btn) btn.classList.remove('playing');
    if (label) label.textContent = 'Play Music';
    const icon = btn && btn.querySelector('.music-icon');
    if (icon) icon.textContent = '🎵';
  }
});
