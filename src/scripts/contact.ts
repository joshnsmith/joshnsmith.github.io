import './email';
const contactForm = document.querySelector<HTMLFormElement>('#contact-form')!;
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const status = document.querySelector<HTMLElement>('#contact-status')!;
  status.replaceChildren();
  const text = document.createTextNode('Email delivery is coming soon. For now, ');
  const email = document.createElement('a');
  email.href = 'mailto:joshsmithsp@gmail.com';
  email.textContent = 'email me directly';
  status.append(text, email, document.createTextNode('.'));
  // The future email endpoint should receive name, email, message, and dietDew.
  // Keep all entered values intact until delivery succeeds.
});
