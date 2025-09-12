import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Rocky Racing - From Sim to Reality",
  description: "Follow Max's racing journey from sim to reality. 13-year-old iRacing driver building a transparent, community-supported path to professional motorsports.",
  keywords: ["iRacing", "sim racing", "motorsports", "racing", "young driver", "esports"],
  authors: [{ name: "Rocky Racing Team" }],
  openGraph: {
    title: "Rocky Racing - From Sim to Reality",
    description: "Follow Max's racing journey from sim to reality. 13-year-old iRacing driver building a transparent, community-supported path to professional motorsports.",
    url: "https://rockyracing13.com",
    siteName: "Rocky Racing",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Rocky Racing - Black & Gold motorsports branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rocky Racing - From Sim to Reality",
    description: "Follow Max's racing journey from sim to reality.",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-body bg-rr-black text-rr-white antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
