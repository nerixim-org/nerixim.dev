import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "nerixim — Software Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        backgroundColor: "#1f2028",
        padding: "80px",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #9ba0c0, #6b6f8e)",
        }}
      />

      {/* Name / logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {/* Circle avatar with "N" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#9ba0c0",
            color: "#1f2028",
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          N
        </div>
        <span
          style={{
            fontSize: "28px",
            color: "#9ba0c0",
            letterSpacing: "0.05em",
          }}
        >
          nerixim.dev
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "64px",
          fontWeight: 700,
          color: "#f0ede8",
          lineHeight: 1.15,
          marginBottom: "24px",
        }}
      >
        Software Developer
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "28px",
          color: "#9b9aaf",
          lineHeight: 1.5,
        }}
      >
        Building software across languages and borders. Based in Japan.
      </div>
    </div>,
    {
      ...size,
    },
  )
}
