import './navigation';
let emailStatusTimer: ReturnType<typeof setTimeout>;
const emailButton = document.querySelector<HTMLButtonElement>('#copy-email')!;
const emailStatus = document.querySelector<HTMLElement>('#email-status')!;
const emailAddress = 'joshsmithsp@gmail.com';
function copyWithSelection(): boolean {
  const previousFocus = document.activeElement as HTMLElement | null;
  const selection = document.getSelection();
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
  const field = document.createElement('textarea');
  field.value = emailAddress;
  field.readOnly = true;
  field.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0;font-size:16px';
  document.body.append(field);
  field.focus({ preventScroll: true });
  field.select();
  field.setSelectionRange(0, field.value.length);
  try { return document.execCommand('copy'); }
  catch { return false; }
  finally {
    field.remove();
    selection?.removeAllRanges();
    ranges.forEach(range => selection?.addRange(range));
    previousFocus?.focus({ preventScroll: true });
  }
}
emailButton.addEventListener('click', async () => {
  clearTimeout(emailStatusTimer);
  emailStatus.textContent = 'Copying email…';
  emailStatus.dataset.state = 'pending';
  emailButton.disabled = true;
  try {
    // Copy within the click gesture first; embedded browsers may leave the
    // asynchronous Clipboard API pending rather than granting or rejecting it.
    if (!copyWithSelection()) {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      let timeout: ReturnType<typeof setTimeout> | undefined;
      try {
        await Promise.race([
          navigator.clipboard.writeText(emailAddress),
          new Promise<never>((_, reject) => { timeout = setTimeout(() => reject(new Error('Clipboard timeout')), 2000); }),
        ]);
      } finally { clearTimeout(timeout); }
    }
    emailStatus.textContent = 'Email copied!';
    emailStatus.dataset.state = 'success';
    emailStatusTimer = setTimeout(() => { emailStatus.textContent = ''; delete emailStatus.dataset.state; }, 6000);
  } catch {
    emailStatus.textContent = `Copy unavailable. Email: ${emailAddress}`;
    emailStatus.dataset.state = 'error';
  } finally { emailButton.disabled = false; }
});
