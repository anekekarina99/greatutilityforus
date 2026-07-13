"use client";

import { useEffect, useRef } from "react";
import type { AdFormat } from "@/lib/ads";
import { getAdDimensions } from "@/lib/ads";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdSenseUnitProps {
  client: string;
  slot: string;
  format: AdFormat;
  className?: string;
}

export function AdSenseUnit({ client, slot, format, className }: AdSenseUnitProps) {
  const pushed = useRef(false);
  const { height } = getAdDimensions(format);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div
      className={cn("flex w-full justify-center overflow-hidden", className)}
      role="complementary"
      aria-label="Iklan"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: height, width: "100%", maxWidth: 728 }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
