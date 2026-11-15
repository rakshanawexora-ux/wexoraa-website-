import { signatureFramePath } from "@/brand/signature";
export default function BrandFrameDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="brand-frame-defs"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath
          id="wexoraa-signature-frame"
          clipPathUnits="objectBoundingBox"
        >
          <path d={signatureFramePath} />
        </clipPath>
      </defs>
    </svg>
  );
}
