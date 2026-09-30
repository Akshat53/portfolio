import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akshat Kumar Singh | Frontend Engineer",
  description: "Building premium digital experiences with React and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
