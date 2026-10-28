'use strict';
const nav = document.querySelector('#main-nav');
const menuButton = document.querySelector('.menu-toggle');
const categoryButton = document.querySelector('#category-toggle');
const mega = document.querySelector('#mega-menu');
const desktop = matchMedia('(min-width: 992px)');
function toggleCategories(open) { categoryButton.setAttribute('aria-expanded', String(open)); mega.hidden = !open; }
function closeNavigation() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); toggleCategories(false); }
menuButton.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
categoryButton.addEventListener('click', () => toggleCategories(mega.hidden));
const categoryNav = document.querySelector('.category-nav');
categoryNav.addEventListener('mouseenter', () => { if (desktop.matches && matchMedia('(hover: hover)').matches) toggleCategories(true); });
categoryNav.addEventListener('mouseleave', () => { if (desktop.matches && !categoryNav.contains(document.activeElement)) toggleCategories(false); });
categoryNav.addEventListener('focusout', event => { if (!categoryNav.contains(event.relatedTarget)) toggleCategories(false); });
document.addEventListener('click', event => { if (!categoryNav.contains(event.target)) toggleCategories(false); if (!event.target.closest('.site-header')) closeNavigation(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { const inCategories = categoryNav.contains(document.activeElement); const wasOpen = nav.classList.contains('open'); closeNavigation(); if (wasOpen) menuButton.focus(); else if (inCategories) categoryButton.focus(); } });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
desktop.addEventListener('change', closeNavigation);
const cards = [...document.querySelectorAll('.category-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#health-search');
let selectedFilter = 'All';
function filterCategories(announce = true) {
 const query = search.value.trim().toLowerCase();
 let count = 0;
 cards.forEach(card => { const groupMatch = selectedFilter === 'All' || (selectedFilter === 'Popular' ? card.dataset.popular === 'true' : card.dataset.group === selectedFilter); const aliases = card.dataset.name === 'Painkillers' ? 'pain relief' : ''; const visible = groupMatch && (card.textContent + ' ' + card.dataset.group + ' ' + aliases).toLowerCase().includes(query); card.hidden = !visible; if (visible) count++; });
 filters.forEach(button => { const active = button.dataset.filter === selectedFilter; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); });
 document.querySelector('#no-results').hidden = count !== 0;
 document.querySelector('#search-status').textContent = announce ? `${count} ${count === 1 ? 'category' : 'categories'} found${search.value.trim() ? ` for “${search.value.trim()}”` : ''}.` : '';
}
filters.forEach(button => button.addEventListener('click', () => { selectedFilter = button.dataset.filter; filterCategories(); }));
search.addEventListener('input', () => { selectedFilter = 'All'; filterCategories(); });
document.querySelector('#search-form').addEventListener('submit', event => { event.preventDefault(); selectedFilter = 'All'; filterCategories(); document.querySelector('#categories').scrollIntoView(); });
document.querySelectorAll('[data-search]').forEach(button => button.addEventListener('click', () => { search.value = button.dataset.search; selectedFilter = 'All'; filterCategories(); document.querySelector('#categories').scrollIntoView(); }));
document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => { search.value = link.dataset.categoryLink; selectedFilter = 'All'; filterCategories(); }));
const descriptions = {
  "Anxiety and Panic Disorder": "Explore information about anxiety, panic disorders, and seizure-related healthcare.",
  "Seizures": "Learn about seizure-related conditions and the importance of appropriate medical care.",
  "Nerve Pain": "Explore information about nerve-related pain and available treatment options.",
  "ADHD & Stimulants": "Learn about ADHD and the healthcare options used to manage its symptoms.",
  "Sleep & Sedatives": "Find information about sleep difficulties and treatments used for sleep-related conditions.",
  "Painkillers": "Understand different approaches to pain relief and pain management.",
  "Digestive Health": "Explore information about common digestive problems and available treatment options.",
  "Allergy-Related": "Learn about common allergies, their symptoms, and ways to manage them.",
  "Skincare": "Discover information about common skin concerns and suitable skincare approaches."
};
function openDetail(title, body) { document.querySelector('#detail-title').textContent = title; document.querySelector('#detail-body').textContent = body; bootstrap.Modal.getOrCreateInstance(document.querySelector('#detail-modal')).show(); }
cards.forEach(card => card.addEventListener('click', event => { event.preventDefault(); openDetail(card.dataset.name, descriptions[card.dataset.name]); }));
document.querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => openDetail(button.dataset.topic, descriptions[button.dataset.topic])));
const articles = [
  [
    "Understanding Human Body",
    "Learn about common health conditions, their symptoms, and when to seek medical advice."
  ],
  [
    "Medicine Safety",
    "Understand the importance of correct medicine use, potential side effects, and professional guidance."
  ],
  [
    "Healthy Lifestyle",
    "Explore practical guidance on balanced nutrition, physical activity, sleep, and daily wellness."
  ],
  [
    "Mental Health Awareness",
    "Find general information about stress, anxiety, emotional well-being, and available support."
  ],
  [
    "Allergy Awareness",
    "Learn about common allergic reactions, potential triggers, and when to seek medical help."
  ]
];
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => openDetail(...articles[Number(button.dataset.article)])));
const policies = {
 'WhatsApp':'The RealMeds WhatsApp number has not been added yet. Contact details will be available here once confirmed.',
 'Telegram':'The RealMeds Telegram link has not been added yet. Contact details will be available here once confirmed.',
 'Privacy Policy':'This static template has no contact form, user accounts, analytics or application storage. Fonts and Bootstrap assets load from third-party CDNs, which receive normal network request data. A complete RealMeds privacy policy must be supplied before launch.',
 'Terms & Conditions':'This is a static demonstration website. No purchases, accounts, prescriptions or healthcare services are provided through this preview. Approved business terms must be added before launch.',
 'Medical Disclaimer':'The introductory content on this website is for general information. It does not replace professional medical advice, diagnosis or treatment. Consult a qualified healthcare professional about your individual needs.',
 'Contact Us':'Verified RealMeds contact details have not been provided. Add the approved email, telephone number, service hours and business address before launching this website.'
};
document.querySelectorAll('[data-policy]').forEach(button => button.addEventListener('click', event => { event.preventDefault(); openDetail(button.dataset.policy, policies[button.dataset.policy]); }));
/* RealMeds FAQ: entrance sequence and accordion state, scoped to #faq. */
(() => {
 const section = document.querySelector('.rm-faq-section');
 if (!section) return;
 const items = [...section.querySelectorAll('.rm-faq-item')];
 const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
 const timers = [];
 let observer;
 let started = false;
 const revealAll = () => {
  timers.forEach(clearTimeout);
  items.forEach(item => item.classList.add('is-visible'));
  section.classList.add('rm-faq-started');
  section.classList.remove('rm-faq-motion');
  if (observer) observer.disconnect();
  started = true;
 };
 const start = () => {
  if (started) return;
  started = true;
  section.classList.add('rm-faq-started');
  items.forEach((item, index) => timers.push(setTimeout(() => item.classList.add('is-visible'), index * 130)));
  observer.disconnect();
 };
 // Install the observer before hiding anything; unsupported browsers remain readable.
 if (!motion.matches && 'IntersectionObserver' in window) {
  try {
   observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) start();
   }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
   observer.observe(section);
   section.classList.add('rm-faq-motion');
  } catch { revealAll(); }
 } else revealAll();
 // Keyboard navigation must never land on an invisible question.
 section.addEventListener('focusin', revealAll);
 motion.addEventListener('change', event => { if (event.matches) revealAll(); });
 items.forEach(item => {
  const answer = item.querySelector('.rm-faq-answer');
  const question = item.querySelector('.rm-faq-question');
  answer.addEventListener('show.bs.collapse', () => item.classList.add('is-open'));
  answer.addEventListener('hide.bs.collapse', () => item.classList.remove('is-open'));
  // Preserve access to answers even if the Bootstrap CDN does not load.
  question.addEventListener('click', () => {
   if (window.bootstrap && window.bootstrap.Collapse) return;
   const open = !answer.classList.contains('show');
   items.forEach(other => {
    other.classList.remove('is-open');
    other.querySelector('.rm-faq-answer').classList.remove('show');
    const button = other.querySelector('.rm-faq-question');
    button.setAttribute('aria-expanded', 'false');
    button.classList.add('collapsed');
   });
   answer.classList.toggle('show', open);
   question.classList.toggle('collapsed', !open);
   question.setAttribute('aria-expanded', String(open));
   item.classList.toggle('is-open', open);
  });
 });
})();


/* Load the silent FAQ background only when appropriate. */
(() => {
 const video = document.querySelector('.rm-faq-video');
 if (!video) return;
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 let inView = false;
 function updatePlayback() {
  if (reduced.matches || !inView || document.hidden) { video.pause(); return; }
  if (!video.getAttribute('src')) { video.src = video.dataset.videoSrc; video.muted = true; }
  video.play().catch(() => {});
 }
 reduced.addEventListener('change', updatePlayback);
 document.addEventListener('visibilitychange', updatePlayback);
 if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; updatePlayback(); }, { rootMargin: '100px' });
  observer.observe(video.closest('.rm-faq-section'));
 } else { inView = true; updatePlayback(); }
})();

/* Keyboard activation for guidance items with semantic H3 titles. */
document.querySelectorAll('.guidance-link[role="button"]').forEach(item => item.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); item.click(); } }));

