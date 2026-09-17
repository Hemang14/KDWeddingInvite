const envelope = document.getElementById('envelope');
const card = document.getElementById('card');
const seal = document.getElementById('seal');
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');

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

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicBtn.classList.remove('paused');
  } else {
    audio.pause();
    musicBtn.classList.add('paused');
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

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

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
