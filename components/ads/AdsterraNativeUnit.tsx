"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdsterraNativeUnitProps {
  scriptUrl: string;
  containerId: string;
  className?: string;
}

export function AdsterraNativeUnit({
  scriptUrl,
  containerId,
  className,
}: AdsterraNativeUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !scriptUrl || !containerId) return;

    const scriptId = `adsterra-native-${containerId}`;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = scriptUrl;
    container.appendChild(script);

    return () => {
      script.remove();
    };
  }, [scriptUrl, containerId]);

  return (
    <div
      className={cn("flex w-full justify-center overflow-hidden min-h-[90px]", className)}
      role="complementary"
      aria-label="Iklan"
    >
      <div
        ref={containerRef}
        id={`container-${containerId}`}
        className="w-full max-w-3xl"
      />
    </div>
  );
}
