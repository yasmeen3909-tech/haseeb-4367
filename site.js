(() => {
  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      navLinks.classList.toggle('is-open', open);
      menuToggle.querySelector('[data-menu-label]').textContent = open ? 'Close' : 'Menu';
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      menuToggle.querySelector('[data-menu-label]').textContent = 'Menu';
    }));
  }

  const filters = document.querySelectorAll('[data-filter]');
  const courseCards = document.querySelectorAll('[data-course-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    courseCards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.courseCategory !== button.dataset.filter;
    });
  }));

  const platformField = document.querySelector('#platform');
  if (platformField) {
    const requested = new URLSearchParams(window.location.search).get('platform');
    if (requested) {
      const option = [...platformField.options].find(item => item.value.toLowerCase() === requested.toLowerCase());
      if (option) platformField.value = option.value;
    }
  }

  const demoForm = document.querySelector('[data-demo-form]');
  if (demoForm) {
    demoForm.addEventListener('submit', event => {
      event.preventDefault();
      const result = demoForm.querySelector('.form-result');
      result.textContent = 'Preview only: your message was not sent or saved. Add a real contact address or connect this form before launch.';
      result.setAttribute('role', 'status');
    });
  }
})();
