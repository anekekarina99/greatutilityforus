import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { AdsterraUnit } from "@/components/ads/AdsterraUnit";
import {
  getAdsProvider,
  getAdSenseClient,
  getAdSenseSlot,
  getAdsterraKey,
  hasLiveAdUnit,
  type AdFormat,
} from "@/lib/ads";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: string;
  format?: AdFormat;
  className?: string;
}

const formatStyles: Record<AdFormat, string> = {
  banner: "min-h-[90px]",
  native: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  sidebar: "min-h-[600px]",
};

function AdPlaceholder({
  slot,
  format,
  className,
}: {
  slot: string;
  format: AdFormat;
  className?: string;
}) {
  return (
    <div
      data-ad-slot={slot}
      data-ad-format={format}
      role="complementary"
      aria-label="Ruang iklan"
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 bg-muted/30 text-xs text-muted-foreground",
        formatStyles[format],
        className
      )}
    >
      <span className="sr-only">Ruang iklan</span>
      <span aria-hidden="true">Ad · {slot}</span>
    </div>
  );
}

export function AdSlot({ slot, format = "banner", className }: AdSlotProps) {
  if (!hasLiveAdUnit(format)) {
    return <AdPlaceholder slot={slot} format={format} className={className} />;
  }

  const provider = getAdsProvider();

  if (provider === "adsterra") {
    const adKey = getAdsterraKey(format);
    if (!adKey) {
      return <AdPlaceholder slot={slot} format={format} className={className} />;
    }
    return <AdsterraUnit adKey={adKey} format={format} className={className} />;
  }

  if (provider === "adsense") {
    const client = getAdSenseClient();
    const adSlot = getAdSenseSlot(format);
    if (!client || !adSlot) {
      return <AdPlaceholder slot={slot} format={format} className={className} />;
    }
    return (
      <AdSenseUnit
        client={client}
        slot={adSlot}
        format={format}
        className={className}
      />
    );
  }

  return <AdPlaceholder slot={slot} format={format} className={className} />;
}
