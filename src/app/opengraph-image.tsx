import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt =
  "Wexoraa Infotech — Design, technology and growth. Connected.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/wexoraa-social-logo.png"),
  );
  const font = await readFile(
    join(process.cwd(), "public/fonts/space-grotesk-social.ttf"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 64,
        background: "#222629",
        color: "#fff",
        fontFamily: "Space Grotesk",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#fff",
            padding: "18px 22px",
            borderRadius: 12,
          }}
        >
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            width={246}
            height={50}
            alt="Wexoraa Infotech"
          />
        </div>
        <div style={{ fontSize: 18, color: "#86C232", letterSpacing: 3 }}>
          BUILD. OPERATE. GROW.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          letterSpacing: -4,
          lineHeight: 1.05,
          marginTop: 68,
          fontWeight: 500,
        }}
      >
        Design, technology
        <br />
        and growth.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          letterSpacing: -4,
          lineHeight: 1.05,
          color: "#86C232",
        }}
      >
        Connected.
      </div>
      <div
        style={{ display: "flex", fontSize: 20, color: "#fff", marginTop: 35 }}
      >
        One technology partner. A clearer next move.
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: font.buffer.slice(
            font.byteOffset,
            font.byteOffset + font.byteLength,
          ),
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
