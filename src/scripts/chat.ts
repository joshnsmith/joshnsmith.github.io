import profile from '../../content/josh-profile.json';
import { apiUrl } from './api';
import './email';
import { createElement, ArrowUpRight } from 'lucide';
type GalleryImage = { src: string; thumbnail: string; alt: string; caption: string };
type Answer = { text: string; links: [string, string][]; images?: GalleryImage[] };
const answers = profile.answers as Record<string, Answer>;
function selectAnswer(question: string): Answer {
  const q = question.toLowerCase();
  if (/^(hi|hey|hello|how are you|how’s it going|how's it going|what’s up|what's up|whats up|sup)[!?.,\s]*$/.test(q.trim())) return answers.greeting;
  if (/\b(contact|email|connect|reach|hire|phone|call|linkedin)\b/.test(q)) return answers.contact;
  if (/bachelor|bachelors|baccalaureate|four[- ]year degree/.test(q)) return answers.bachelors;
  if (/your story|josh.?s story|background story|how .*start|how .*get into|how .*learn.*cod|electrician|electrical work|high school|highschool|attic|spider/.test(q)) return answers.story;
  if (/family|sibling|brother|sister|bereave|passed away/.test(q)) return answers.family;
  if (/space\s*engineers/.test(q)) return answers.spaceengineers;
  if (/hobb|favorite|favourite|food|drink|rees|ice cream|diet|dew|coke|bbq|nerds|truck|tacoma|camp|pickleball|soccer|football|drone|video game|board game|3d print|halo|color|colour|space engineers|family|kids|children|spouse|married|marriage|homeowner|outside (work|coding)/.test(q)) return answers.personal;
  if (/stationeers/.test(q)) return answers.stationeers;
  if (/diddy/.test(q)) return answers.diddy;
  if (/data\s*connector/.test(q)) return answers.dataconnector;
  if (/project|what .*built/.test(q)) return answers.projects;
  if (/certif|credential|eagle scout|comptia/.test(q)) return answers.certifications;
  if (/education|degree|college|university|byu|schooling/.test(q)) return answers.education;
  if (/leadership|manager|manage|lead|team|code review/.test(q)) return answers.leadership;
  if (/experience|career|work history|employment|employer|data connector|xantie|fisher|smart finger|smart wave/.test(q)) return answers.experience;
  if (/resume/.test(q)) return answers.resume;
  if (/project|built|build|portfolio|code/.test(q)) return answers.projects;
  if (/skill|tool|technolog|stack|language/.test(q)) return answers.skills;
  if (/about|who|introduc|hello|^hi\b|know josh/.test(q)) return answers.about;
  return answers.fallback;
}
const form = document.querySelector<HTMLFormElement>('#chat-form')!;
const input = document.querySelector<HTMLTextAreaElement>('#question')!;
const conversation = document.querySelector<HTMLElement>('#conversation')!;
const welcome = document.querySelector<HTMLElement>('#welcome')!;
let busy = false;
let controller: AbortController | undefined;
let history: { role: 'user' | 'assistant'; content: string }[] = [];
const imageDialog = document.createElement('dialog');
imageDialog.className = 'image-preview';
imageDialog.setAttribute('aria-label', 'Image preview');
const closePreview = document.createElement('button');
closePreview.type = 'button'; closePreview.className = 'image-preview-close'; closePreview.textContent = 'Close';
const fullImage = document.createElement('img');
const imageCaption = document.createElement('p');
imageDialog.append(closePreview, fullImage, imageCaption);
document.body.append(imageDialog);
closePreview.addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });
function openImage(image: GalleryImage) {
  fullImage.src = image.src; fullImage.alt = image.alt;
  imageCaption.textContent = image.caption;
  imageDialog.showModal();
}
async function ask(question: string) {
  if (busy) return;
  question = question.trim().slice(0, 500);
  if (!question) return;
  welcome.hidden = true;
  conversation.hidden = false;
  const user = document.createElement('div');
  user.className = 'message user';
  user.textContent = question;
  conversation.append(user);
  busy = true;
  const send = document.querySelector<HTMLButtonElement>('#send')!;
  send.disabled = true;
  const chatVersion = controller = new AbortController();
  const answer = { ...selectAnswer(question) };
  let live = false;
  const reply = document.createElement('div');
  reply.className = 'message assistant';
  const content = document.createElement('div'); content.className = 'answer-content';
  const label = document.createElement('strong'); label.className = 'answer-label'; label.textContent = 'JOSH SMITH GPT';
  const paragraph = document.createElement('p'); paragraph.textContent = 'Thinking…';
  const links = document.createElement('div'); links.className = 'answer-links';
  for (const [name, href] of answer.links) {
    const isContactLink = /^(mailto:|tel:)/.test(href) || href.includes('linkedin.com');
    const asksForContact = /\b(contact|email|phone|call|linkedin|reach|connect|hire)\b/i.test(question);
    if (isContactLink && !asksForContact) continue;
    const link = document.createElement('a'); link.textContent = name.replace(' ↗', ''); if (name.includes('↗')) { const icon = createElement(ArrowUpRight, { width: 14, height: 14, 'stroke-width': 1.8, 'aria-hidden': 'true' }); link.append(icon); } link.href = href;
    if (href === '#projects') link.addEventListener('click', event => { event.preventDefault(); ask('What has Josh built?'); });
    if (href.startsWith('https://')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    links.append(link);
  }
  const source = document.createElement('small');
  source.className = 'answer-source';
  const gallery = document.createElement('div'); gallery.className = 'answer-gallery';
  for (const image of answer.images ?? []) {
    const figure = document.createElement('figure');
    const button = document.createElement('button'); button.type = 'button';
    button.setAttribute('aria-label', `Enlarge ${image.caption}`);
    const thumbnail = document.createElement('img');
    thumbnail.src = image.thumbnail; thumbnail.alt = image.alt;
    thumbnail.loading = 'lazy'; thumbnail.decoding = 'async';
    const caption = document.createElement('figcaption'); caption.textContent = image.caption;
    button.append(thumbnail); figure.append(button, caption); gallery.append(figure);
    button.addEventListener('click', () => openImage(image));
  }
  gallery.hidden = true;
  content.append(label, paragraph, gallery, links, source); reply.append(content); conversation.append(reply);
  links.hidden = true;
  input.value = '';
  const timeout = window.setTimeout(() => chatVersion.abort(), 20000);
  try {
    const response = await fetch(apiUrl('/chat'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }), signal: chatVersion.signal,
    });
    if (!response.ok) throw new Error('AI unavailable');
    const result = await response.json();
    if (typeof result.text !== 'string' || !result.text.trim()) throw new Error('Empty reply');
    answer.text = result.text;
    live = true;
  } catch {
    // Keep approved answers available when AI is offline or its free quota is exhausted.
  } finally {
    window.clearTimeout(timeout);
    if (controller === chatVersion) {
      busy = false;
      send.disabled = false;
    }
  }
  if (controller !== chatVersion) return;
  paragraph.textContent = answer.text;
  gallery.hidden = !gallery.childElementCount;
  links.hidden = false;
  source.textContent = live ? 'AI-generated' : 'From Josh’s approved portfolio answers · Live AI is unavailable.';
  history = [...history, { role: 'user' as const, content: question }, { role: 'assistant' as const, content: answer.text.slice(0, 1500) }].slice(-6);
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.getAttribute('data-question') === question));
  input.focus({ preventScroll: true });
  reply.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
}
form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); ask(input.value); } });
document.querySelectorAll<HTMLButtonElement>('[data-question]').forEach(button => button.addEventListener('click', () => { if (button.dataset.hello === 'true') { window.location.href = '/hello/'; return; } ask(button.dataset.question!); }));
document.querySelector('#new-chat')!.addEventListener('click', () => {
  controller?.abort(); controller = undefined; busy = false; history = [];
  document.querySelector<HTMLButtonElement>('#send')!.disabled = false;
  conversation.replaceChildren(); conversation.hidden = true; welcome.hidden = false; input.value = '';
  document.querySelectorAll('.nav-item').forEach((item, index) => item.classList.toggle('active', index === 0));
  input.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'smooth' });
});
