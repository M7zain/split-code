import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Navbar from "@/app/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

const RB = localFont ( 
  { 
    src: [
      {
        path: "../../public/fonts/bold.ttf",
        weight: "700", 
      },
      {
        path: "../../public/fonts/regular.ttf",
        weight: "400", 
      },
      {
        path: "../../public/fonts/slim.ttf",
        weight: "100", 
      },
    ],
    variable:"--font-rb",
  }
)

export const metadata: Metadata = {
  title: "Split Code ",
  description: "Empower Your Projects with Collaborative Development.",
  metadataBase: new URL('https://splitcode.tech/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${RB.variable} ${inter.className}`}>

        <Navbar/>
        {children}
        </body>
    </html>
  );
}
