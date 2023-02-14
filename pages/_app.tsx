import { AppProps } from "next/app";
import "../styles/globals.scss";
import "../styles/font.scss";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
