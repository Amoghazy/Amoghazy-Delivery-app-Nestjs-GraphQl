import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../Providers";

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
  title: "FIMTO ",
  description: "Delivery App UI for the Delivery App",
  icons: {
    icon: "../../public/stellar-coin_825462.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" href="../../public/stellar-coin_825462.png" />
      </head>
      <body
        className={` ${nunito.variable} ${geistMono.variable} antialiased h-screen `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
