import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../Providers";
import { ToastContainer } from "react-toastify";

const nunito = localFont({
  src: "./fonts/Nunito-VariableFont_wght.ttf",
  variable: "--font-nunito",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Delivery App",
  description: "Delivery App UI for the Delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={` ${nunito.variable} ${geistMono.variable} antialiased h-screen `}
      >
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
