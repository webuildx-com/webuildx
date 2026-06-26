#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const appDir = path.join(__dirname, "../src/app");
const svg = fs.readFileSync(path.join(appDir, "icon.svg"));

const render = (size, background) =>
  sharp(svg, { density: 400 })
    .resize(size, size, {
      fit: "contain",
      background,
      kernel: sharp.kernel.lanczos3,
    })
    .png();

const whiteBg = { r: 255, g: 255, b: 255, alpha: 1 };

async function main() {
  await render(32, whiteBg).toFile(path.join(appDir, "icon.png"));

  await render(180, whiteBg).toFile(path.join(appDir, "apple-icon.png"));

  const favicon32 = await render(32, whiteBg).toBuffer();
  const favicon16 = await sharp(favicon32).resize(16, 16).png().toBuffer();

  let pngToIco;
  try {
    pngToIco = require("png-to-ico");
  } catch {
    const { execSync } = require("child_process");
    execSync("npm install --no-save png-to-ico", { stdio: "inherit" });
    pngToIco = require("png-to-ico");
  }

  const ico = await pngToIco.default([favicon16, favicon32]);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);

  console.log("Favicons generated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
