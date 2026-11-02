/**
 * render.js - Renders .slide elements from carrossel.html as Instagram-ready PNGs
 *
 * Usage: node render.js [path-to-carrossel.html]
 *
 * Requirements:
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Output: instagram/slide-01.png, slide-02.png, etc. (1080x1350px, 4:5 ratio)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// --- Configuration ---
const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;
const DEVICE_SCALE_FACTOR = 1; // 1:1 pixel mapping for exact 1080x1350 output
const OUTPUT_DIR = 'instagram';

async function render(htmlPath) {
  // Resolve the HTML file path
  const resolvedHtmlPath = path.resolve(htmlPath || 'carrossel.html');

  if (!fs.existsSync(resolvedHtmlPath)) {
    console.error(`[ERROR] HTML file not found: ${resolvedHtmlPath}`);
    process.exit(1);
  }

  console.log(`[INFO] Rendering slides from: ${resolvedHtmlPath}`);

  // Create output directory next to the HTML file
  const htmlDir = path.dirname(resolvedHtmlPath);
  const outputDir = path.join(htmlDir, OUTPUT_DIR);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`[INFO] Created output directory: ${outputDir}`);
  }

  // Launch browser
  const browser = await chromium.launch({
    // headless: true is the default
  });

  const context = await browser.newContext({
    viewport: { width: SLIDE_WIDTH, height: SLIDE_HEIGHT },
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    // Disable animations for consistent screenshots
    reducedMotion: 'reduce',
  });

  const page = await context.newPage();

  // Navigate to the local HTML file using file:// protocol
  const fileUrl = `file:///${resolvedHtmlPath.replace(/\\/g, '/')}`;
  console.log(`[INFO] Loading: ${fileUrl}`);

  await page.goto(fileUrl, {
    waitUntil: 'networkidle', // Wait for all resources (fonts, images) to load
    timeout: 30000,
  });

  // Wait for Google Fonts to be fully loaded
  // document.fonts.ready resolves when all font faces have loaded or failed
  await page.evaluate(() => document.fonts.ready);
  console.log('[INFO] Fonts loaded successfully');

  // Additional wait to ensure any font-triggered reflows are complete
  await page.waitForTimeout(500);

  // Wait for any background images to finish loading
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'));
    // Also check for elements with background-image
    const allElements = Array.from(document.querySelectorAll('*'));
    const bgImagePromises = allElements
      .map((el) => {
        const bg = window.getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') {
          const urlMatch = bg.match(/url\(["']?(.+?)["']?\)/);
          if (urlMatch) {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // Don't block on failed images
              img.src = urlMatch[1];
            });
          }
        }
        return null;
      })
      .filter(Boolean);

    const imgPromises = images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    await Promise.all([...imgPromises, ...bgImagePromises]);
  });
  console.log('[INFO] All images loaded');

  // Find all .slide elements
  const slides = await page.$$('.slide');
  const slideCount = slides.length;

  if (slideCount === 0) {
    console.error('[ERROR] No elements with class .slide found in the HTML');
    await browser.close();
    process.exit(1);
  }

  console.log(`[INFO] Found ${slideCount} slide(s) to render`);

  // Screenshot each slide
  for (let i = 0; i < slideCount; i++) {
    const slideNumber = String(i + 1).padStart(2, '0');
    const filename = `slide-${slideNumber}.png`;
    const outputPath = path.join(outputDir, filename);

    // Use element.screenshot() for pixel-perfect capture of each slide
    // This captures exactly the element's bounding box, respecting its CSS dimensions
    await slides[i].screenshot({
      path: outputPath,
      type: 'png',
      // omitBackground: false ensures we capture any background colors/images
      omitBackground: false,
    });

    // Verify output dimensions
    const stats = fs.statSync(outputPath);
    console.log(
      `[OK] ${filename} (${(stats.size / 1024).toFixed(1)} KB)`
    );
  }

  await browser.close();

  console.log(`\n[DONE] ${slideCount} slide(s) saved to: ${outputDir}`);
  console.log(`[INFO] Resolution: ${SLIDE_WIDTH}x${SLIDE_HEIGHT}px (Instagram 4:5)`);
}

// --- Entry point ---
const htmlArg = process.argv[2];
render(htmlArg).catch((err) => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});
