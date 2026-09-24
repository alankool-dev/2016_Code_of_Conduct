let guides = [];
let selectedRole = location.hash === '#coach' ? 'coach' : 'player';
const container = document.querySelector('#behaviours');
const status = document.querySelector('#content-status');
const buttons = [...document.querySelectorAll('[data-role]')];

export function validGuides(value) {
  return Array.isArray(value) && ['player', 'coach'].every(role => {
    const guide = value.find(item => item.role === role);
    return guide && typeof guide.intro === 'string' && typeof guide.review_note === 'string'
      && Array.isArray(guide.behaviours) && guide.behaviours.length > 0
      && guide.behaviours.every(item => typeof item.title === 'string' && typeof item.description === 'string');
  });
}

function render() {
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.role === selectedRole)));
  const guide = guides.find(item => item.role === selectedRole);
  if (!guide) return;
  document.querySelector('#role-intro').textContent = guide.intro;
  document.querySelector('#role-count').textContent = `${guide.behaviours.length} shared expectations`;
  document.querySelector('#review-note').textContent = guide.review_note;
  container.replaceChildren(...guide.behaviours.map((item, index) => {
    const article = document.createElement('article');
    article.className = 'behaviour';
    const top = document.createElement('div');
    top.className = 'card-top';
    top.setAttribute('aria-hidden', 'true');
    const number = document.createElement('span');
    number.className = 'number';
    number.textContent = String(index + 1).padStart(2, '0');
    const line = document.createElement('span');
    line.className = 'card-line';
    top.append(number, line);
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    article.append(top, title, description);
    return article;
  }));
  container.setAttribute('aria-busy', 'false');
}

buttons.forEach(button => button.addEventListener('click', () => {
  selectedRole = button.dataset.role;
  history.replaceState(null, '', `#${selectedRole}`);
  render();
}));
window.addEventListener('hashchange', () => {
  selectedRole = location.hash === '#coach' ? 'coach' : 'player';
  render();
});

async function readJson(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('Content unavailable');
  return response.json();
}

async function init() {
  try {
    const config = await readJson('/config.json');
    if (!config.supabaseUrl || !config.publishableKey) throw new Error('Not connected');
    const live = await readJson(`${config.supabaseUrl}/rest/v1/behaviour_guides?select=role,intro,review_note,behaviours&order=role`, {
      headers: { apikey: config.publishableKey }
    });
    if (!validGuides(live)) throw new Error('Incomplete guide');
    guides = live;
    status.textContent = '';
  } catch {
    try {
      const fallback = await readJson('/guide.json');
      if (!validGuides(fallback)) throw new Error('Incomplete guide');
      guides = fallback;
      status.textContent = 'Live updates are unavailable. Showing the saved review draft.';
    } catch {
      status.textContent = 'The guide could not be loaded. Please try again or use the club policy links below.';
      container.setAttribute('aria-busy', 'false');
    }
  }
  render();
}
init();
