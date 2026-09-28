// IndexNow: tells Bing (and Yandex, Seznam, Naver) which pages changed, so they recrawl within hours.
// Run AFTER a deploy is live:  npm run indexnow
// The key file (<KEY>.txt at the site root) proves we own the domain; build.mjs writes it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { F } from './facts.mjs';

export const INDEXNOW_KEY = 'd89017e1822e6200cf7f15d9f4594fa2';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const urls = [...fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const host = new URL(F.domain).host;
  // The live key file must be reachable first, or the engines reject the ping.
  const live = await fetch(`${F.domain}/${INDEXNOW_KEY}.txt`).then((r) => (r.ok ? r.text() : '')).catch(() => '');
  if (live.trim() !== INDEXNOW_KEY) {
    console.error(`✗ ${F.domain}/${INDEXNOW_KEY}.txt isn't live yet. Deploy first, then run this.`);
    process.exit(1);
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${F.domain}/${INDEXNOW_KEY}.txt`, urlList: urls }),
  });
  // 200 = accepted, 202 = accepted and key check pending; anything else is a problem.
  console.log(res.status === 200 || res.status === 202 ? `✓ IndexNow accepted ${urls.length} URLs (HTTP ${res.status}).` : `✗ IndexNow answered HTTP ${res.status}: ${await res.text()}`);
  process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
}
