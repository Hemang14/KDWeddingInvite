const envelope = document.getElementById('envelope');
const card = document.getElementById('card');
const seal = document.getElementById('seal');
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');

const petals = document.getElementById('petals');
if (petals && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    const size = 4 + Math.random() * 4;
    p.style.left = Math.random() * 100 + '%';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = (7 + Math.random() * 7) + 's';
    p.style.animationDelay = -Math.random() * 12 + 's';
    p.style.opacity = 0.3 + Math.random() * 0.4;
    petals.appendChild(p);
  }
}

if (location.hash === '#open') {
  envelope.remove();
  card.setAttribute('aria-hidden', 'false');
  musicBtn.hidden = false;
}

seal.addEventListener('click', () => {
  envelope.classList.add('open');
  card.setAttribute('aria-hidden', 'false');
  musicBtn.hidden = false;
  audio.play().catch(() => {});
  setTimeout(() => envelope.remove(), 1200);
});

let musicWanted = false;

seal.addEventListener('click', () => { musicWanted = true; });

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    musicWanted = true;
    audio.play();
    musicBtn.classList.remove('paused');
  } else {
    musicWanted = false;
    audio.pause();
    musicBtn.classList.add('paused');
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    audio.pause();
  } else if (musicWanted) {
    audio.play().catch(() => {});
  }
});

const target = new Date('2026-12-12T11:00:00+05:30').getTime();
const cd = {
  d: document.getElementById('cd-d'),
  h: document.getElementById('cd-h'),
  m: document.getElementById('cd-m'),
  s: document.getElementById('cd-s')
};

function tick() {
  const diff = target - Date.now();
  if (diff <= 0) {
    cd.d.textContent = '00';
    cd.h.textContent = '00';
    cd.m.textContent = '00';
    cd.s.textContent = '00';
    return;
  }
  cd.d.textContent = String(Math.floor(diff / 864e5)).padStart(2, '0');
  cd.h.textContent = String(Math.floor(diff / 36e5) % 24).padStart(2, '0');
  cd.m.textContent = String(Math.floor(diff / 6e4) % 60).padStart(2, '0');
  cd.s.textContent = String(Math.floor(diff / 1e3) % 60).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

document.querySelectorAll('section, footer').forEach(sec => {
  sec.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', Math.min(i * 0.11, 0.66) + 's');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    e.target.classList.toggle('in', e.isIntersecting);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('rsvp-form');
const thankyou = document.getElementById('thankyou');
const tyMsg = document.getElementById('ty-msg');

form.addEventListener('submit', () => {
  const attending = form.querySelector('input[name^="entry"][value^="Yes"]');
  const saidYes = attending && attending.checked;
  tyMsg.textContent = saidYes
    ? "From the bottom of our hearts, thank you for being part of our special day. Your love and warm wishes mean more than words can say. We can't wait to see you!"
    : "We'll miss having you with us, but we're so grateful for your love and blessings. You'll be in our hearts on our special day.";
  setTimeout(() => thankyou.classList.add('show'), 400);
});

document.getElementById('ty-close').addEventListener('click', () => {
  thankyou.classList.remove('show');
});
