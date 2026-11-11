import { chromium } from "@playwright/test";
import fs from "node:fs";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
(async () => {
  const root =
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..") + "/";
  const output = root + ".studio-render/";
  fs.mkdirSync(output, { recursive: true });
  const logo = fs
    .readFileSync(root + "public/brand/wexoraa-logo.svg")
    .toString("base64");
  const font = fs
    .readFileSync(root + "public/fonts/space-grotesk.ttf")
    .toString("base64");
  const html = `<!doctype html><style>@font-face{font-family:studio;src:url(data:font/ttf;base64,${font})}*{box-sizing:border-box}html,body{margin:0;width:1280px;height:720px;overflow:hidden}body{background:#222629;color:#FFFFFF;font-family:studio;position:relative}.grid{position:absolute;inset:0;background-image:linear-gradient(#86C2320c 1px,transparent 1px),linear-gradient(90deg,#86C2320c 1px,transparent 1px);background-size:60px 60px}.glow{position:absolute;inset:0;background:radial-gradient(ellipse at 75% 50%,#86C23228,transparent 50%)}.top{position:absolute;top:38px;left:48px;right:48px;display:flex;justify-content:space-between;font-size:11px;letter-spacing:2px;color:#D5D7D8}.top img{background:#FFFFFF;border-radius:8px;width:148px;padding:12px}.top span{padding-top:10px}.copy{position:absolute;left:65px;top:180px;z-index:3}.copy small{font-size:11px;letter-spacing:2px;color:#D5D7D8}.copy h1{font-size:87px;font-weight:500;letter-spacing:-5px;line-height:1.01;margin:26px 0}.copy em{color:#86C232;font-style:normal}.copy p{font-size:15px;color:#D5D7D8;line-height:1.6;max-width:340px}.scene{position:absolute;right:65px;top:115px;width:530px;height:490px;perspective:900px}.ring{position:absolute;left:50%;top:50%;width:440px;height:440px;border:2px solid #86C232;border-radius:50%;transform:translate(-50%,-50%) rotateX(62deg) rotateZ(-25deg);box-shadow:0 0 24px #86C23214;animation:orbit 8s linear infinite}.ring.b{width:365px;height:365px;border-color:#D5D7D8;animation-direction:reverse;animation-duration:12s;transform:translate(-50%,-50%) rotateY(57deg) rotateZ(35deg)}.ring.c{width:285px;height:285px;border-color:#61892F;animation-duration:10s;transform:translate(-50%,-50%) rotateX(-25deg) rotateY(30deg)}.ring:after{content:'';position:absolute;top:-7px;left:50%;height:14px;width:14px;border-radius:50%;background:#86C232;box-shadow:0 0 30px #86C232}.core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:190px;height:190px;background:linear-gradient(135deg,#86C232,#86C232);border:1px solid #61892F;border-radius:36px;box-shadow:16px 20px 0 #86C23213,0 0 120px #86C23220;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;animation:float 5s ease-in-out infinite}.core img{width:158px;background:#FFFFFF;padding:12px 10px;border-radius:8px}.core span{font-size:9px;letter-spacing:1px;color:#222629}.node{position:absolute;border:1px solid #6B6E70;background:#474B4Fe8;backdrop-filter:blur(12px);padding:16px 24px;border-radius:12px;font-size:17px;box-shadow:0 10px 30px #0003;animation:float 4s ease-in-out infinite}.n1{left:0;top:52px}.n2{right:-5px;top:135px;animation-delay:-1s}.n3{left:55px;bottom:30px;animation-delay:-2s}.node i{display:inline-block;width:6px;height:6px;background:#86C232;border-radius:50%;margin-right:10px}.bottom{position:absolute;bottom:35px;left:48px;right:48px;border-top:1px solid #474B4F;padding-top:18px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:1.7px;color:#D5D7D8}.progress{position:absolute;bottom:0;left:0;height:3px;background:#86C232;animation:progress 8s linear infinite}@keyframes orbit{to{rotate:1turn}}@keyframes float{50%{translate:0 -16px}}@keyframes progress{from{width:0}to{width:100%}}</style><div class=grid></div><div class=glow></div><div class=top><img src="data:image/svg+xml;base64,${logo}"/><span>WEXORAA / STUDIO IN MOTION</span></div><div class=copy><small>DIFFERENT DISCIPLINES. ONE SHARED DIRECTION.</small><h1>Built to<br/>move you<br/><em>forward.</em></h1><p>Creative thinking. Connected systems.<br/>More possibilities for your business.</p></div><div class=scene><div class=ring></div><div class="ring b"></div><div class="ring c"></div><div class=core><img src="data:image/svg+xml;base64,${logo}"/><span>CONNECTED BY DESIGN</span></div><div class="node n1"><i></i>Build.</div><div class="node n2"><i></i>Operate.</div><div class="node n3"><i></i>Grow.</div></div><div class=bottom><span>STRATEGY → DESIGN → ENGINEERING → GROWTH</span><span>ORIGINAL STUDIO MOTION GRAPHIC / 001</span></div><div class=progress></div>`;
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: output, size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: output + "poster.png" });
  await sharp(output + "poster.png")
    .webp({ quality: 90 })
    .toFile(root + "public/motion/studio-poster.webp");
  await page.waitForTimeout(8500);
  const video = page.video();
  await context.close();
  await video.saveAs(output + "source.webm");
  await browser.close();
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-ss",
      "0.5",
      "-i",
      output + "source.webm",
      "-t",
      "8",
      "-an",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-preset",
      "fast",
      "-crf",
      "24",
      "-movflags",
      "+faststart",
      root + "public/motion/wexoraa-studio.mp4",
    ],
    { stdio: "inherit" },
  );
  console.log("Original motion graphic rendered");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
