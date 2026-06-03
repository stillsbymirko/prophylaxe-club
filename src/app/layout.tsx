import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prophylaxe-Erinnerung",
    template: "%s · Prophylaxe-Erinnerung",
  },
  description:
    "DSGVO-konformer Link-Generator für Prophylaxe-Kalendererinnerungen in Zahnarztpraxen. Keine Patientendaten — Kalenderdownload direkt im Browser.",
  metadataBase: new URL("https://prophylaxeerinnerung.de"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
