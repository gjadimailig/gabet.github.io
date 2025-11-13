const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('[data-section]');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.primary-nav');
const featureTabs = document.querySelectorAll('.feature-tab');
const featureStage = document.querySelector('[data-feature-stage]');
const scrollButtons = document.querySelectorAll('[data-scroll]');
const signupForm = document.querySelector('[data-component="signup-form"]');
const feedbackField = document.querySelector('.form-feedback');
const yearField = document.querySelector('[data-year]');

yearField.textContent = new Date().getFullYear();

const featureCopy = {
  spending: {
    eyebrow: 'Live spending',
    title: 'Spot anomalies before they escalate.',
    body:
      "Gabet clusters every transaction, flags unusual vendors, and recommends actions without leaving the conversation thread.",
    bullets: [
      'Bank-grade import speed with custom categories',
      'Instant sync to consolidated reports',
      'One-tap dispute and receipt upload',
    ],
    status: 'Stable',
    rows: [
      { label: 'Dining', change: '-12% vs last week' },
      { label: 'Rides & Travel', change: '+6% vs forecast' },
      { label: 'Team perks', change: 'On track' },
    ],
  },
  automation: {
    eyebrow: 'Automation studio',
    title: 'Put money moves on autopilot.',
    body:
      'Trigger transfers, vault rules, and reminders the moment pay-ins arrive or limits are exceeded.',
    bullets: [
      'Template gallery for payroll, reimbursements, and vaults',
      'Human-readable rules powered by natural language',
      'Version history so finance can review every change',
    ],
    status: 'Flowing',
    rows: [
      { label: 'Salary sweep', change: '₱45k → Reserve' },
      { label: 'Goal boosts', change: '+15% to Events' },
      { label: 'Bill autopay', change: 'All synced' },
    ],
  },
  insights: {
    eyebrow: 'AI insights',
    title: 'Answers you can act on instantly.',
    body:
      'Conversations stay grounded in your ledger so you can follow up with a plan, not just a chart.',
    bullets: [
      'Narratives tuned for local nuances',
      'Context-aware follow-up suggestions',
      'Exportable summaries for leadership updates',
    ],
    status: 'Fresh',
    rows: [
      { label: 'Cash runway', change: '8.2 months' },
      { label: 'Variance alerts', change: '2 needing review' },
      { label: 'Opportunities', change: '₱12k savings' },
    ],
  },
};

const renderFeature = (id) => {
  const copy = featureCopy[id];
  if (!copy) return;
  featureStage.querySelector('.stage-eyebrow').textContent = copy.eyebrow;
  featureStage.querySelector('h3').textContent = copy.title;
  featureStage.querySelector('p').textContent = copy.body;
  const list = featureStage.querySelector('ul');
  list.innerHTML = copy.bullets.map((item) => `<li>${item}</li>`).join('');

  const rows = copy.rows
    .map(
      (row) => `
        <li>
          <span>${row.label}</span>
          <strong>${row.change}</strong>
        </li>
      `,
    )
    .join('');
  const stackCard = document.querySelector('.stack-card');
  stackCard.querySelector('.status-pill').textContent = copy.status;
  stackCard.querySelector('ul').innerHTML = rows;
};

featureTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    featureTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    renderFeature(tab.dataset.feature);
  });
});

renderFeature('spending');

scrollButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scroll);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('open');
});

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }),
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => observer.observe(section));

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(signupForm);
  const email = data.get('email');
  feedbackField.textContent = `Thanks, ${email}! We will send the TestFlight invite shortly.`;
  signupForm.reset();
  setTimeout(() => {
    feedbackField.textContent = '';
  }, 7000);
});
