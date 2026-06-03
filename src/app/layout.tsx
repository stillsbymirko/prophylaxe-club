import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display-family",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html
      lang="de"
      className={`${fraunces.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
