// Build formatted text with DOM nodes so AI output never becomes executable HTML.
export function renderAnswerText(target: HTMLElement, text: string) {
  target.replaceChildren();
  const bold = /\*\*([^*]+)\*\*/g;
  let offset = 0;
  for (const match of text.matchAll(bold)) {
    target.append(document.createTextNode(text.slice(offset, match.index)));
    const strong = document.createElement('strong');
    strong.textContent = match[1];
    target.append(strong);
    offset = match.index! + match[0].length;
  }
  target.append(document.createTextNode(text.slice(offset)));
}
