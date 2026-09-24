let guides = [];
let selectedRole = location.hash === '#coach' ? 'coach' : 'player';
const container = document.querySelector('#behaviours');
const status = document.querySelector('#content-status');
const buttons = [...document.querySelectorAll('[data-role]')];
const selections = { player: 0, coach: 0 };

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
  const list = document.createElement('div');
  list.className = 'expectation-list';
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', 'Choose an expectation');
  list.setAttribute('aria-orientation', 'vertical');
  const detail = document.createElement('article');
  detail.className = 'expectation-detail';
  detail.id = 'expectation-detail';
  detail.setAttribute('role', 'tabpanel');
  detail.tabIndex = 0;
  const counter = document.createElement('p');
  counter.className = 'eyebrow';
  const title = document.createElement('h3');
  const description = document.createElement('p');
  description.className = 'expectation-description';
  detail.append(counter, title, description);
  const tabs = guide.behaviours.map((item, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'expectation-tab';
    tab.id = `expectation-${selectedRole}-${index}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', detail.id);
    const number = document.createElement('span');
    number.className = 'number';
    number.setAttribute('aria-hidden', 'true');
    number.textContent = String(index + 1).padStart(2, '0');
    const label = document.createElement('span');
    label.textContent = item.title;
    tab.append(number, label);
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
    return tab;
  });
  function select(index) {
    selections[selectedRole] = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    const item = guide.behaviours[index];
    detail.setAttribute('aria-labelledby', tabs[index].id);
    counter.textContent = `Expectation ${index + 1} of ${tabs.length}`;
    title.textContent = item.title;
    description.textContent = item.description;
  }
  list.append(...tabs);
  container.replaceChildren(list, detail);
  select(Math.min(selections[selectedRole], tabs.length - 1));
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
  let connected = false;
  try {
    const config = await readJson('/config.json');
    if (!config.supabaseUrl || !config.publishableKey) throw new Error('Not connected');
    connected = true;
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
      status.textContent = connected ? 'Live updates are unavailable. Showing the saved guide.' : '';
    } catch {
      status.textContent = 'The guide could not be loaded. Please try again or use the club policy links below.';
      container.setAttribute('aria-busy', 'false');
    }
  }
  render();
}
init();
