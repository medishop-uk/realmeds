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
