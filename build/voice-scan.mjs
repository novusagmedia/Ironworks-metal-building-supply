// Voice scan: node build/voice-scan.mjs [--list]
// Counts the machine-writing tells from the upgrade prompt across every built page,
// and classifies each dash as prose (judge it), list grammar (keep), range (keep), or label (strip).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
const LIST = process.argv.includes('--list');

const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ');
const text = (h) => strip(h).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');

const CHECKS = {
  'AI vocabulary': /\b(delve|tapestry|robust|vibrant|showcase|seamless(ly)?|leverage|elevate|unlock|empower|game[- ]changer|cutting[- ]edge|state[- ]of[- ]the[- ]art)\b/gi,
  '"Not just X" parallelism': /\bnot (just|only|merely) [^.]{1,60}(, but|—|–)/gi,
  'Inflated significance': /(stands as a testament|plays a (vital|crucial|pivotal) role|underscores the importance|a testament to|in today'?s (fast[- ]paced )?world)/gi,
  'Promotional superlatives': /\b(the best|world[- ]class|premier|unmatched|unparalleled|second to none|industry[- ]leading|#1)\b/gi,
};

const totals = { words: 0, prose: 0, listGrammar: 0, range: 0, label: 0, series: 0 };
const hits = Object.fromEntries(Object.keys(CHECKS).map((k) => [k, []]));
const prose = [];

for (const f of files) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const t = text(html);
  totals.words += t.split(' ').filter(Boolean).length;
  for (const [name, re] of Object.entries(CHECKS)) for (const m of t.matchAll(re)) hits[name].push(`${f}: "${m[0]}"`);
  totals.series += (t.match(/\b\w+, \w+(?: \w+)?, (and|or) \w+/g) || []).length;

  // Labels: alt text and aria-labels are read aloud; dashes there always go.
  for (const [, v] of strip(html).matchAll(/(?:alt|aria-label|title)="([^"]*)"/g)) totals.label += (v.match(/[—–]/g) || []).length;

  const body = strip(html).replace(/(?:alt|aria-label|title|content)="[^"]*"/g, '');
  // List grammar: <strong>Term</strong> — definition
  totals.listGrammar += (body.match(/<\/strong>\s*—/g) || []).length;
  const rest = body.replace(/<\/strong>\s*—/g, '');
  // Ranges: en dash between numbers, times, or weekday names
  const rangeRe = /(\d|AM|PM|day)\s*–\s*(\d|Mon|Tue|Wed|Thu|Fri|Sat|Sun)/g;
  totals.range += (rest.match(rangeRe) || []).length;
  const t2 = text(rest.replace(rangeRe, '$1 $2'));
  for (const m of t2.matchAll(/.{0,50}[—–].{0,50}/g)) prose.push(`${f}: …${m[0].trim()}…`);
}
totals.prose = prose.length;

console.log(`Pages: ${files.length} · Words: ${totals.words}`);
for (const [k, v] of Object.entries(hits)) console.log(`${k}: ${v.length}${v.length ? '\n  ' + v.join('\n  ') : ''}`);
console.log(`Three-item series: ${totals.series} (${(totals.series / totals.words * 1000).toFixed(1)} per 1,000 words)`);
console.log(`Dashes: prose ${totals.prose} (${(totals.prose / totals.words * 100).toFixed(2)} per 100 words) · list grammar ${totals.listGrammar} (keep) · ranges ${totals.range} (keep) · in alt/aria/title ${totals.label} (strip)`);
if (LIST) console.log('\nProse dashes:\n  ' + prose.join('\n  '));
