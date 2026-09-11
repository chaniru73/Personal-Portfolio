import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#050505", color: "#f4f4f1", fontSize: 72, fontWeight: 700 }}>C<span style={{ color: "#22e37d" }}>W</span></div>,
    size,
  );
}
