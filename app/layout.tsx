import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const jakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-jakarta",
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warmly | Premium Greetings for Every Moment",
  description: "Discover, download, and share high-quality greeting cards, festival wishes, and social media posters for every occasion.",
  keywords: [
    "greeting cards", 
    "festival wishes", 
    "Happy Birthday images", 
    "Diwali greetings", 
    "download images", 
    "Warmly"
  ],
  openGraph: {
    title: "Warmly | Premium Greetings for Every Moment",
    description: "Discover, download, and share high-quality greeting cards.",
    url: "https://warmly.app",
    siteName: "Warmly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warmly | Premium Greetings",
    description: "Discover, download, and share high-quality greeting cards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="t-bg t-text min-h-screen flex flex-col">
        <Navbar />
        {/* flex-1 ensures the page content pushes the footer to the bottom */}
        <div className="flex-1"> 
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}