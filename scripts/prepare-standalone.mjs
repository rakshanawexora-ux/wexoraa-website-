import { cp, access, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
// Next standalone output deliberately omits these assets by default.
const root = process.cwd();
const bundle = resolve(root, ".next/standalone");
await access(resolve(bundle, "server.js"));
await mkdir(resolve(bundle, ".next"), { recursive: true });
await cp(resolve(root, "public"), resolve(bundle, "public"), { recursive: true, force: true });
await cp(resolve(root, ".next/static"), resolve(bundle, ".next/static"), { recursive: true, force: true });
console.log("Standalone server prepared with public assets and Next static files.");
