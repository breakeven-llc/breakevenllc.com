import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Breakeven LLC",
  description: "Professional solutions for modern business challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <nav className="container">
            <a href="/" className="logo">Breakeven LLC</a>
          </nav>
        </header>
        {children}
        <footer className="container">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 text-sm">
              <span className="text-primary animate-pulse-glow">●</span>
              <span className="text-gray-400">Systems Operational</span>
            </div>
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Breakeven LLC. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
