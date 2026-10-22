import { ImageResponse } from "next/og";

export const alt = "Aniq Haider · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#0b0d12",
          color: "#f5f6f8",
        }}
      >
        <div style={{ fontSize: 28, color: "#9aa3b2", marginBottom: 24 }}>aniq-haider.vercel.app</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Aniq Haider</div>
        <div style={{ fontSize: 40, color: "#c9ced8", marginTop: 24 }}>
          Software engineer building fast, scalable products with AI
        </div>
        <div style={{ fontSize: 28, color: "#9aa3b2", marginTop: 40 }}>
          React · Next.js · Node.js · Python · AWS
        </div>
      </div>
    ),
    size,
  );
}
