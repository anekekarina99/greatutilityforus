export type AdFormat = "banner" | "native" | "rectangle" | "sidebar";
export type AdsProvider = "adsterra" | "adsense" | "none";

const FORMAT_DIMENSIONS: Record<AdFormat, { width: number; height: number }> = {
  banner: { width: 728, height: 90 },
  native: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  sidebar: { width: 160, height: 600 },
};

export function isAdsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
}

export function getAdsProvider(): AdsProvider {
  if (!isAdsEnabled()) return "none";
  const provider = process.env.NEXT_PUBLIC_ADS_PROVIDER ?? "adsterra";
  if (provider === "adsense" || provider === "adsterra") return provider;
  return "adsterra";
}

export function getAdsterraKey(format: AdFormat): string | undefined {
  const nativeKey = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY;
  const keys: Record<AdFormat, string | undefined> = {
    banner: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY,
    native: nativeKey,
    rectangle: nativeKey ?? process.env.NEXT_PUBLIC_ADSTERRA_RECTANGLE_KEY,
    sidebar: process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY,
  };
  return keys[format]?.trim() || undefined;
}

/** Adsterra atOptions.format — native units use "native", banners use "iframe". */
export function getAdsterraInvokeFormat(format: AdFormat): "iframe" | "native" {
  return format === "native" ? "native" : "iframe";
}

export function getAdSenseClient(): string | undefined {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || undefined;
}

export function getAdSenseSlot(format: AdFormat): string | undefined {
  const nativeSlot = process.env.NEXT_PUBLIC_ADSENSE_NATIVE_SLOT;
  const slots: Record<AdFormat, string | undefined> = {
    banner: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT,
    native: nativeSlot,
    rectangle: nativeSlot ?? process.env.NEXT_PUBLIC_ADSENSE_RECTANGLE_SLOT,
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT,
  };
  return slots[format]?.trim() || undefined;
}

export function getAdDimensions(format: AdFormat) {
  return FORMAT_DIMENSIONS[format];
}

export function hasLiveAdUnit(format: AdFormat): boolean {
  if (!isAdsEnabled()) return false;
  const provider = getAdsProvider();
  if (provider === "adsterra") return Boolean(getAdsterraKey(format));
  if (provider === "adsense") {
    return Boolean(getAdSenseClient() && getAdSenseSlot(format));
  }
  return false;
}
