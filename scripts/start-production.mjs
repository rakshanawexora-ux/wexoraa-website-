import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const server = new URL("../.next/standalone/server.js", import.meta.url);
try {
  await access(fileURLToPath(server));
} catch {
  console.error("Production server is missing. Run npm run build before npm run start.");
  process.exit(1);
}
// Bind all interfaces, but preserve the platform-assigned PORT.
process.env.HOSTNAME = "0.0.0.0";
await import(server.href);
