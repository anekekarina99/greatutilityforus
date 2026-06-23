import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/seo";

export const alt = "BMI Free — Alat online gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { name } = getSiteConfig();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, opacity: 0.9 }}>
          {name}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          Alat online gratis untuk gambar
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 32, opacity: 0.85 }}>
          Resize · Kompres · Konversi — diproses di browser, tanpa upload.
        </div>
      </div>
    ),
    { ...size }
  );
}
