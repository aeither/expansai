import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import WebApp from "@twa-dev/sdk";
import { Telegram } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

WebApp.ready();

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
