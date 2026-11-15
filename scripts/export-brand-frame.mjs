import { readFile, writeFile } from "node:fs/promises";
const source = await readFile(
  new URL("../src/brand/signature.ts", import.meta.url),
  "utf8",
);
const match = source.match(/signatureFramePath\s*=\s*"([^"]+)"/);
if (!match) throw new Error("Signature geometry not found");
for (const [name, fill, stroke] of [
  ["wexoraa-signature-frame", "#86C232", "none"],
  ["wexoraa-signature-frame-charcoal", "#222629", "none"],
  ["wexoraa-signature-frame-outline", "none", "#222629"],
]) {
  const viewBox = stroke === "none" ? "0 0 1200 700" : "-4 -4 1208 708";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="${viewBox}"><title>Wexoraa signature container</title><desc>Offset container with a raised rounded right shoulder and a broad content-safe body.</desc><g transform="scale(1200 700)"><path d="${match[1]}" fill="${fill}" stroke="${stroke}" stroke-width="3" vector-effect="non-scaling-stroke"/></g></svg>`;
  await writeFile(new URL(`../public/brand/${name}.svg`, import.meta.url), svg);
}
console.log("Exported three Wexoraa signature frame SVGs.");
