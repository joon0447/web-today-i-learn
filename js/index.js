/* ===========================
   TIL 폼 등록
   =========================== */
const tilForm = document.querySelector('#til-form');
const tilList = document.querySelector('#til-list');

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function addDeleteButton(item) {
    const btn = document.createElement('button');
    btn.className = 'til-delete-btn';
    btn.setAttribute('aria-label', '삭제');
    btn.textContent = '✕';
    btn.addEventListener('click', () => {
        item.classList.add('til-item--removing');
        setTimeout(() => item.remove(), 250);
    });
    item.appendChild(btn);
}

tilForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.querySelector('#til-date').value;
    const title = document.querySelector('#til-title').value.trim();
    const content = document.querySelector('#til-content').value.trim();

    if (!date || !title || !content) return;

    const article = document.createElement('article');
    article.className = 'til-item til-item--new';
    article.innerHTML = `
    <time>${date}</time>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(content)}</p>
  `;

    addDeleteButton(article);
    tilList.insertBefore(article, tilList.firstChild);
    tilForm.reset();

    article.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// 기존 til-item 삭제 버튼 추가
document.querySelectorAll('.til-item').forEach(addDeleteButton);

// 초기화 버튼: 폼 입력값 + TIL 목록 전체 삭제
const resetBtn = document.querySelector('#til-form button[type="reset"]');
resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tilForm.reset();
    tilList.innerHTML = '';
});


/* ===========================
   갤러리 라이트박스
   =========================== */
const galleryImages = document.querySelectorAll('.gallery-grid img');

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
  <div class="lightbox-backdrop"></div>
  <button class="lightbox-close" aria-label="닫기">✕</button>
  <button class="lightbox-prev" aria-label="이전">&#8249;</button>
  <img class="lightbox-img" src="" alt="" />
  <button class="lightbox-next" aria-label="다음">&#8250;</button>
  <p class="lightbox-caption"></p>
`;
document.body.insertBefore(lightbox, document.body.firstChild);

let currentIndex = 0;
const images = Array.from(galleryImages);

function openLightbox(index) {
    currentIndex = index;
    const img = images[index];
    lightbox.querySelector('.lightbox-img').src = img.src;
    lightbox.querySelector('.lightbox-img').alt = img.alt;
    lightbox.querySelector('.lightbox-caption').textContent = img.alt;
    lightbox.classList.add('lightbox--active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('lightbox--active');
    document.body.style.overflow = '';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
}

images.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('lightbox--active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});


/* ===========================
   내비게이션 스크롤 활성화
   =========================== */
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.toggle(
                        'nav-link--active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    },
    { threshold: 0.3 }
);

sections.forEach((section) => observer.observe(section));