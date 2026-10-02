import { mkdir, cp, rm } from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('public', { recursive: true });
// Preserve existing public portfolio routes without moving their source files.
for (const path of ['resume', 'Joshua_Smith_Resume_2026.pdf', 'profile-tn.jpg', 'favicon.ico', 'FinalProject', 'lesson-7', 'assets']) {
  await cp(path, `public/${path}`, { recursive: true });
}
// Stop serving the older resume that includes a private phone number.
await rm('public/JoshSmithResume.pdf', { force: true });

await cp('LUCIDE-LICENSE.txt', 'public/lucide-license.txt');
await mkdir('public/profile-pictures', { recursive: true });
for (const photo of ['IMG_2971.jpg', 'IMG_2979.jpg', 'IMG_2961.jpg']) {
  await cp(`profile-pictures/${photo}`, `public/profile-pictures/${photo}`);
}

await mkdir('public/project-images', { recursive: true });
for (const name of ['dataconnector_homepage', 'dataconnector_sample', 'spaceengineers_plane', 'spaceengineers_tank']) {
  await cp(`project-images/${name}.png`, `public/project-images/${name}.png`);
  await sharp(`project-images/${name}.png`).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/project-images/${name}.webp`);
}
