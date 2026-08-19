import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
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
  title: "Warmly",
  description:
    "Discover, download, and share high-quality greeting cards, festival wishes, and social media posters for every occasion.",
  icons: {
    icon: "/logo.png",
  },
  keywords: [
    "greeting cards",
    "festival wishes",
    "Happy Birthday images",
    "Diwali greetings",
    "download images",
    "Warmly",
  ],
  openGraph: {
    title: "Warmly | Premium Greetings for Every Moment",
    description:
      "Discover, download, and share high-quality greeting cards.",
    url: "https://warmly.app",
    siteName: "Warmly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warmly | Premium Greetings",
    description:
      "Discover, download, and share high-quality greeting cards.",
  },
};

const themeCheckScript = `
  (function() {
    try {
      var savedTheme = window.localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      }
    } catch (e) {}
  })();
`;

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
      <head>
        {/* Inject the blocking script here */}
        <script dangerouslySetInnerHTML={{ __html: themeCheckScript }} />
      </head>
      <body className="t-bg t-text min-h-screen flex flex-col w-full overflow-x-hidden">
        <Navbar />
        <div className="h-14 shrink-0" />
        <div className="flex-1 w-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}