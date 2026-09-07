import { ImageResponse } from "next/og";

export const alt = "Chaniru Weerasuriya - Software Engineering undergraduate at NSBM Green University";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#020817", color: "#f8fafc", borderTop: "10px solid #22e37d", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", padding: "14px 18px", border: "1px solid #223148", borderRadius: 8, fontSize: 32, fontWeight: 700 }}>C<span style={{ color: "#22e37d" }}>W</span></div>
          <span style={{ fontSize: 24, color: "#cbd5e1" }}>Software Engineering Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>Chaniru Weerasuriya</div>
          <div style={{ display: "flex", fontSize: 30, color: "#22e37d" }}>Software Engineering | Backend | Cloud &amp; DevOps</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #223148", paddingTop: 24, fontSize: 24, color: "#cbd5e1" }}>
          <span>Third-year BSc (Hons) Software Engineering undergraduate</span>
          <span>NSBM Green University | Malabe, Sri Lanka</span>
        </div>
      </div>
    ),
    size,
  );
}
