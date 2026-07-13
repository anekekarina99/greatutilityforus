"use client";

import { useEffect, useRef } from "react";
import type { AdFormat } from "@/lib/ads";
import { getAdDimensions, getAdsterraInvokeFormat } from "@/lib/ads";
import { cn } from "@/lib/utils";

interface AdsterraUnitProps {
  adKey: string;
  format: AdFormat;
  className?: string;
}

export function AdsterraUnit({ adKey, format, className }: AdsterraUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = getAdDimensions(format);
  const invokeFormat = getAdsterraInvokeFormat(format);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !adKey) return;

    container.innerHTML = "";

    const optionsScript = document.createElement("script");
    optionsScript.textContent = `
      atOptions = {
        'key' : '${adKey}',
        'format' : '${invokeFormat}',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const invokeScript = document.createElement("script");
    invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;

    container.appendChild(optionsScript);
    container.appendChild(invokeScript);

    return () => {
      container.innerHTML = "";
    };
  }, [adKey, height, invokeFormat, width]);

  return (
    <div
      className={cn("flex w-full justify-center overflow-hidden", className)}
      role="complementary"
      aria-label="Iklan"
    >
      <div
        ref={containerRef}
        className="flex items-center justify-center"
        style={{ minHeight: height, maxWidth: "100%" }}
      />
    </div>
  );
}
