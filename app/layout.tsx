import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Herald Recruitment Platform",
  description: "A Recruitment Web Page for Herald College Kathmandu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--background)] text-[var(--primary)]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={true}
        >
          <ReactQueryProvider>
          {children}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
