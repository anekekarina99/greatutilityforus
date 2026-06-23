import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: string;
  format?: "banner" | "rectangle" | "sidebar";
  className?: string;
}

const formatStyles = {
  banner: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  sidebar: "min-h-[600px]",
};

export function AdSlot({ slot, format = "banner", className }: AdSlotProps) {
  return (
    <div
      data-ad-slot={slot}
      data-ad-format={format}
      role="complementary"
      aria-label="Iklan"
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
