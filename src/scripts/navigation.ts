const sidebar = document.querySelector<HTMLElement>('#portfolio-sidebar')!;
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const closeButton = document.querySelector<HTMLButtonElement>('.sidebar-close')!;
const workspace = document.querySelector<HTMLElement>('.workspace')!;
const mobile = window.matchMedia('(max-width: 700px)');
const backdrop = document.createElement('button');
backdrop.type = 'button'; backdrop.className = 'sidebar-backdrop';
backdrop.setAttribute('aria-label', 'Close navigation'); backdrop.tabIndex = -1;
backdrop.hidden = true; document.body.append(backdrop);
let opened = false;
function setOpen(next: boolean, restoreFocus = true) {
  opened = next && mobile.matches;
  document.body.classList.toggle('sidebar-open', opened);
  toggle.setAttribute('aria-expanded', String(opened));
  toggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  sidebar.inert = mobile.matches && !opened;
  workspace.inert = opened;
  backdrop.hidden = !opened;
  if (mobile.matches && !opened) sidebar.setAttribute('aria-hidden', 'true');
  else sidebar.removeAttribute('aria-hidden');
  if (opened) {
    sidebar.setAttribute('role', 'dialog'); sidebar.setAttribute('aria-modal', 'true');
    closeButton.focus();
  } else {
    sidebar.removeAttribute('role'); sidebar.removeAttribute('aria-modal');
    if (restoreFocus && mobile.matches) toggle.focus({ preventScroll: true });
  }
}
toggle.addEventListener('click', () => setOpen(!opened));
closeButton.addEventListener('click', () => setOpen(false));
backdrop.addEventListener('click', () => setOpen(false));
sidebar.addEventListener('click', event => {
  if ((event.target as HTMLElement).closest('a, [data-question], #new-chat') && opened) setOpen(false);
});
document.addEventListener('keydown', event => {
  if (!opened) return;
  if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
  if (event.key !== 'Tab') return;
  const items = Array.from(sidebar.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(item => item.getClientRects().length > 0);
  const first = items[0]; const last = items.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});
mobile.addEventListener('change', () => setOpen(false, false));
document.documentElement.classList.add('navigation-ready');
setOpen(false, false);
