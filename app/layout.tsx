import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


// Custom local fonts
const forum = localFont({
  src: "../public/fonts/Forum/Forum-Regular.ttf",
  variable: "--font-forum",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peraj Insurance",
  description: "Insurance solutions that understand businesses and the people behind them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${forum.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
