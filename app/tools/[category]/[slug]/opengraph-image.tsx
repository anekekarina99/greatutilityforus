import { ImageResponse } from "next/og";
import { getAllToolPaths, getTool } from "@/lib/tools";
import { getSiteConfig } from "@/lib/seo";

export const alt = "BMI Free tool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllToolPaths();
}

interface Props {
  params: { category: string; slug: string };
}

export default function OpengraphImage({ params }: Props) {
  const tool = getTool(params.category, params.slug);
  const { name } = getSiteConfig();
  const headline = tool?.headline ?? "Alat online gratis";
  const subhead = tool?.subhead ?? "";

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
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700, opacity: 0.9 }}>
          {name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          {headline}
        </div>
        {subhead ? (
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, opacity: 0.85 }}>
            {subhead}
          </div>
        ) : (
          <div style={{ display: "flex" }} />
        )}
      </div>
    ),
    { ...size }
  );
}
