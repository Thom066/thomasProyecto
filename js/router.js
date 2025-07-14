window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);

function renderRoute() {
  const route = window.location.hash.replace('#', '') || 'dashboard';
  if (!isAuthenticated() && ['dashboard', 'dashboard/events/create', 'dashboard/events/edit'].includes(route)) {
    renderNotFound();
    return;
  }
  if (isAuthenticated() && (route === 'login' || route === 'register')) {
    window.location.hash = 'dashboard';
    return;
  }
  switch (route) {
    case 'login': renderLogin(); break;
    case 'register': renderRegister(); break;
    case 'dashboard': renderDashboard(); break;
    case 'dashboard/events/create': renderCreateEvent(); break;
    case 'dashboard/events/edit': renderEditEvent(); break;
    default: renderNotFound();
  }
}