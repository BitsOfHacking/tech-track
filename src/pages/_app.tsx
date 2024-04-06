import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component
      className={"min-h-screen bg-background font-sans antialiased"}
      {...pageProps}
    />
  );
}
