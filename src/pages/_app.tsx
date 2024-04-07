import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Nunito as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
      html {
        font-family: ${fontSans.style.fontFamily}
      `}
      
      </style>
      
      <Component
        className={"min-h-screen bg-background font-sans antialiased"}
        {...pageProps}
      />
    </>
  );
}
