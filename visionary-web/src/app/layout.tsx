import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VISIONARY | The Anti-Agent Real Estate App",
  description: "Don't buy the house. Buy the vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
