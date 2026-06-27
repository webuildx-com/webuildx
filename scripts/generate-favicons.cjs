#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");
const pngToIco = require("png-to-ico").default || require("png-to-ico");

const ROOT = path.join(__dirname, "..");
const APP_DIR = path.join(ROOT, "src/app");
const PUBLIC_DIR = path.join(ROOT, "public");

const MARK_POINTS = [
  "531.02 147.97 224.68 147.97 372.65 0 383.15 0 531.02 147.97",
  "679.19 147.97 679.19 153.22 454.51 377.9 383.05 449.26 372.55 449.26 301.29 377.9 229.93 449.26 219.43 449.26 206.14 435.98 129.53 359.37 71.46 301.19 71.36 301.19 0 229.83 0 219.33 71.36 147.97 224.58 147.97 148.07 224.58 206.14 282.76 301.29 377.8 377.8 301.29 377.9 301.29 377.9 301.19 454.51 224.58 454.61 224.58 531.22 147.97 679.19 147.97",
];

function makeSvg(fill) {
  const polys = MARK_POINTS.map(
    (points) => `<polygon fill="${fill}" points="${points}"/>`,
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 679.19 679.19"><g transform="translate(0 114.97)">${polys}</g></svg>`;
}

function renderPng(svg, size) {
  const resvg = new Resvg(Buffer.from(svg), {
    fitTo: { mode: "width", value: size },
    background: "rgba(0,0,0,0)",
  });

  return resvg.render().asPng();
}

async function main() {
  const whiteSvg = makeSvg("#ffffff");
  const inkSvg = makeSvg("#0b1e1c");

  fs.writeFileSync(path.join(APP_DIR, "icon.svg"), whiteSvg);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-dark.svg"), whiteSvg);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-light.svg"), inkSvg);

  const icon32 = renderPng(whiteSvg, 32);
  const icon180 = renderPng(whiteSvg, 180);
  const light32 = renderPng(inkSvg, 32);
  const icon16 = renderPng(whiteSvg, 16);

  fs.writeFileSync(path.join(APP_DIR, "icon.png"), icon32);
  fs.writeFileSync(path.join(APP_DIR, "apple-icon.png"), icon180);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-light.png"), light32);

  const ico = await pngToIco([icon16, icon32]);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), ico);

  console.log("Favicons generated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
