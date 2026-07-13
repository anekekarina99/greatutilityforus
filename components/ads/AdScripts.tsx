import { getAdSenseClient, getAdsProvider, isAdsEnabled } from "@/lib/ads";
import Script from "next/script";

export function AdScripts() {
  if (!isAdsEnabled() || getAdsProvider() !== "adsense") return null;

  const client = getAdSenseClient();
  if (!client) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
