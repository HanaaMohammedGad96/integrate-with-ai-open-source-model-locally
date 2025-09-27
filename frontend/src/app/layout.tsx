import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Chat - Modern Local AI Assistant",
  description: "Chat with local AI models using Ollama. Experience the future of AI with a beautiful, modern interface.",
  keywords: ["AI", "Chat", "Ollama", "Local AI", "Machine Learning", "GPT", "LLM"],
  authors: [{ name: "Hanaa Mohammed" }],
  creator: "Hanaa Mohammed",
  openGraph: {
    title: "AI Chat - Modern Local AI Assistant",
    description: "Chat with local AI models using Ollama. Experience the future of AI with a beautiful, modern interface.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chat - Modern Local AI Assistant",
    description: "Chat with local AI models using Ollama. Experience the future of AI with a beautiful, modern interface.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} font-sans antialiased h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900`}
      >
        {children}
      </body>
    </html>
  );
}
