import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Living Word Frames",
  description: "Luxury custom frame design and inspo studio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
