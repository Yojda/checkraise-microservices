import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/markdown.css";
// import UserBootstrapper from "@/components/auth/UserBootstrapper";
// import ProblemsBootstrapper from "@/components/problems/ProblemsBootstrapper";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHECKRAISE.fr",
  description: "Une plateforme pour pratiquer le poker en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased`}
      >
        {/*<UserBootstrapper />*/}
        {/*<ProblemsBootstrapper />*/}
        {children}
      </body>
    </html>
  );
}
