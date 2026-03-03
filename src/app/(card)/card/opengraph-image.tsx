import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Nikita — Freelance Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function CardOgImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#1f2028",
      }}
    >
      {/* Card shape */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "780px",
          height: "480px",
          borderRadius: "24px",
          border: "1px solid rgba(155, 160, 192, 0.2)",
          backgroundColor: "#282a35",
          padding: "56px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#f0ede8",
              lineHeight: 1.15,
            }}
          >
            Nikita
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#9b9aaf",
              marginTop: "8px",
            }}
          >
            Freelance Software Engineer
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#6b6f8e",
              marginTop: "24px",
            }}
          >
            Building software across languages and borders
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "18px",
            color: "#9ba0c0",
          }}
        >
          <span>nerixim.dev</span>
          <span style={{ color: "#4a4d60" }}>|</span>
          <span>Japan</span>
          <span style={{ color: "#4a4d60" }}>|</span>
          <span>github.com/nerixim</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
