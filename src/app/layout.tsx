import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/state";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obsidian Engine",
  description: "Platform manajemen event lembaga kampus dengan sistem tiket digital QR",
  icons: {
    icon: "/logolomba1.png",
    shortcut: "/logolomba1.png",
    apple: "/logolomba1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <AppProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <Navbar />
            <main className="flex-grow px-4 py-6">
              {children}
            </main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
