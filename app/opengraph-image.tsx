import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 56,
          background:
            "linear-gradient(135deg, #f2f3f0 0%, #ffffff 42%, #ffe1bf 100%)",
          color: "#111111",
          fontFamily: "Avenir Next, PingFang SC, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid #cbccc9",
            borderRadius: 32,
            padding: 44,
            background: "rgba(255,255,255,0.84)",
            boxShadow: "0 24px 72px rgba(17,17,17,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                width: 68,
                height: 68,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                background: "#ff8400",
                fontSize: 34,
                fontWeight: 700,
              }}
            >
              G
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 22, textTransform: "uppercase", letterSpacing: 3 }}>
                Git Learning System
              </div>
              <div style={{ fontSize: 34, fontWeight: 700 }}>Git Org Academy</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 840 }}>
            <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>
              Master Git. Build Better History.
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.4, color: "#4b4b4b" }}>
              Bilingual guides for commands, workflows, internals, and recovery.
            </div>
          </div>

          <div style={{ display: "flex", gap: 18 }}>
            {["Commands", "Workflows", "Internals", "Recovery"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "1px solid #cbccc9",
                  fontSize: 22,
                  background: "#ffffff",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
