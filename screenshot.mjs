import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, "temporary screenshots");

const url = process.argv[2];
const label = process.argv[3] || "";

if (!url) {
  console.error("Usage: node screenshot.mjs <url> [label]");
  process.exit(1);
}

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function getNextFilename() {
  const files = fs.readdirSync(SCREENSHOTS_DIR).filter((f) => f.endsWith(".png"));
  let max = 0;
  for (const f of files) {
    const match = f.match(/^screenshot-(\d+)/);
    if (match) max = Math.max(max, parseInt(match[1]));
  }
  const n = String(max + 1).padStart(1, "0");
  return label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Users/giussepeshunaula/.cache/puppeteer/chrome/mac_arm-149.0.7827.22/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

  const filename = getNextFilename();
  const filepath = path.join(SCREENSHOTS_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: false });

  await browser.close();
  console.log(`Saved: temporary screenshots/${filename}`);
})();
