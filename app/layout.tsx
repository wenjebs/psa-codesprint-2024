import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mentorship Matching",
  description: "Find or become a mentor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
