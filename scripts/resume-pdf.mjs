// Regenerates public/Akshat_Kumar_Singh_Resume.pdf from the /resume page's print stylesheet,
// so the downloadable PDF is real, selectable text (readable by applicant-tracking systems).
//
//   npm run build && npm start            # in one terminal
//   npm run resume:pdf                    # in another
//
// Uses an installed Chrome/Chromium: set CHROME_PATH, or it tries the system Chrome.
// BASE_URL defaults to http://localhost:3000.
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync, rmSync } from 'node:fs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'public', 'Akshat_Kumar_Singh_Resume.pdf');
const base = process.env.BASE_URL || 'http://localhost:3000';

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' },
);
const page = await browser.newPage();
await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
await page.goto(`${base}/resume`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
await browser.close();

// The résumé must be exactly one page. Refuse to leave a longer PDF behind.
const pages = (readFileSync(out, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
if (pages !== 1) {
  rmSync(out);
  console.error(`résumé came out at ${pages} pages; lower --print-k in app/resume/resume.css or trim lib/resume-data.ts`);
  process.exit(1);
}
console.log(`wrote ${path.relative(root, out)} (1 page)`);
