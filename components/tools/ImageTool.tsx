"use client";

import * as React from "react";
import {
  Download,
  ImageIcon,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { Button, Card, IconButton, Text, TextField } from "@radix-ui/themes";
import { addToHistory } from "@/lib/storage";
import type { ImageToolMode, ToolContent, ToolPreset } from "@/lib/tools";
import {
  aspectRatioLabel,
  cn,
  formatBytes,
} from "@/lib/utils";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface ImageToolProps {
  tool: ToolContent & { mode: ImageToolMode };
}

interface ImageState {
  file: File;
  url: string;
  width: number;
  height: number;
}

interface ProcessResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
}

function loadImage(file: File): Promise<ImageState> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        file,
        url,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gagal membaca gambar. Pastikan file tidak rusak."));
    };
    img.src = url;
  });
}

function drawToCanvas(
  img: HTMLImageElement,
  width: number,
  height: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak didukung di browser ini.");
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Gagal memproses gambar."));
      },
      type,
      quality
    );
  });
}

async function compressToTargetSize(
  canvas: HTMLCanvasElement,
  maxBytes: number,
  type: string
): Promise<Blob> {
  let quality = 0.92;
  let blob = await canvasToBlob(canvas, type, quality);

  while (blob.size > maxBytes && quality > 0.1) {
    quality -= 0.05;
    blob = await canvasToBlob(canvas, type, quality);
  }

  if (blob.size > maxBytes) {
    let scale = 0.9;
    let scaledCanvas = canvas;
    while (blob.size > maxBytes && scale > 0.3) {
      const w = Math.round(canvas.width * scale);
      const h = Math.round(canvas.height * scale);
      scaledCanvas = document.createElement("canvas");
      scaledCanvas.width = w;
      scaledCanvas.height = h;
      const ctx = scaledCanvas.getContext("2d")!;
      ctx.drawImage(canvas, 0, 0, w, h);
      quality = 0.85;
      blob = await canvasToBlob(scaledCanvas, type, quality);
      while (blob.size > maxBytes && quality > 0.1) {
        quality -= 0.05;
        blob = await canvasToBlob(scaledCanvas, type, quality);
      }
      scale -= 0.1;
    }
  }

  return blob;
}

function getOutputMime(mode: ImageToolMode, preset: ToolPreset): string {
  if (mode === "convert" && preset.format === "png") return "image/png";
  if (preset.format === "webp") return "image/webp";
  return "image/jpeg";
}

function getOutputExtension(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function computeTargetDimensions(
  srcW: number,
  srcH: number,
  preset: ToolPreset
): { width: number; height: number } {
  const targetW = preset.width;
  const targetH = preset.height;

  if (targetW && targetH) return { width: targetW, height: targetH };

  if (targetW && !targetH) {
    const ratio = targetW / srcW;
    return { width: targetW, height: Math.round(srcH * ratio) };
  }

  if (targetH && !targetW) {
    const ratio = targetH / srcH;
    return { width: Math.round(srcW * ratio), height: targetH };
  }

  return { width: srcW, height: srcH };
}

export function ImageTool({ tool }: ImageToolProps) {
  const { mode, presets, cta, slug } = tool;
  const [image, setImage] = React.useState<ImageState | null>(null);
  const [result, setResult] = React.useState<ProcessResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const [customWidth, setCustomWidth] = React.useState(
    presets.width?.toString() ?? ""
  );
  const [customHeight, setCustomHeight] = React.useState(
    presets.height?.toString() ?? ""
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const resultUrlRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (image?.url) URL.revokeObjectURL(image.url);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, [image]);

  const activePreset: ToolPreset = React.useMemo(
    () => ({
      ...presets,
      width: customWidth ? parseInt(customWidth, 10) : presets.width,
      height: customHeight ? parseInt(customHeight, 10) : presets.height,
    }),
    [presets, customWidth, customHeight]
  );

  const handleFile = async (file: File) => {
    setError(null);
    setResult(null);
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Format tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File terlalu besar. Coba di bawah 10 MB.");
      return;
    }

    try {
      if (image?.url) URL.revokeObjectURL(image.url);
      const loaded = await loadImage(file);
      setImage(loaded);

      if (mode === "dimensions") {
        addToHistory({
          toolSlug: slug,
          timestamp: Date.now(),
          label: `${loaded.width}×${loaded.height}`,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat gambar.");
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  };

  const processImage = async () => {
    if (!image) return;
    setProcessing(true);
    setError(null);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Gagal memproses gambar."));
        img.src = image.url;
      });

      const mime = getOutputMime(mode, activePreset);
      let blob: Blob;
      let outW: number;
      let outH: number;

      if (mode === "dimensions") {
        setError(null);
        setProcessing(false);
        return;
      }

      const { width, height } = computeTargetDimensions(
        image.width,
        image.height,
        activePreset
      );
      outW = width;
      outH = height;

      const canvas = drawToCanvas(img, width, height);

      if (mode === "compress" && activePreset.maxSizeMB) {
        const maxBytes = activePreset.maxSizeMB * 1024 * 1024;
        blob = await compressToTargetSize(canvas, maxBytes, mime);
      } else {
        const quality = activePreset.quality ?? 0.92;
        blob = await canvasToBlob(canvas, mime, quality);
      }

      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const resultUrl = URL.createObjectURL(blob);
      resultUrlRef.current = resultUrl;

      setResult({
        blob,
        url: resultUrl,
        width: outW,
        height: outH,
      });

      addToHistory({
        toolSlug: slug,
        timestamp: Date.now(),
        label: `${formatBytes(blob.size)} · ${outW}×${outH}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat memproses.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const ext = getOutputExtension(result.blob.type);
    const baseName = image?.file.name.replace(/\.[^.]+$/, "") ?? "gambar";
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${baseName}-${slug}.${ext}`;
    a.click();
  };

  const clearAll = () => {
    if (image?.url) URL.revokeObjectURL(image.url);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    resultUrlRef.current = null;
    setImage(null);
    setResult(null);
    setError(null);
  };

  const showDimensionControls = mode === "resize" || mode === "compress";
  const isDimensionsMode = mode === "dimensions";

  return (
    <Card size="3" className="overflow-hidden">
      <div>
        {!image ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Area unggah gambar. Seret file atau klik untuk memilih."
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-colors focus-ring",
              dragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <Upload className="mb-4 h-10 w-10 text-muted-foreground" aria-hidden="true" />
            <p className="text-center font-medium">Seret gambar ke sini</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              atau klik untuk memilih · JPG, PNG, WebP · maks. 10 MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              className="sr-only"
              aria-hidden="true"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{image.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {image.width} × {image.height} px · {formatBytes(image.file.size)}
                  </p>
                </div>
              </div>
              <IconButton
                variant="ghost"
                color="gray"
                onClick={clearAll}
                aria-label="Hapus gambar"
              >
                <X className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="overflow-hidden rounded-xl border bg-muted/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt="Pratinjau gambar yang diunggah"
                className="mx-auto max-h-64 w-auto object-contain"
              />
            </div>

            {isDimensionsMode && (
              <div
                className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2"
                aria-live="polite"
              >
                <div>
                  <p className="text-sm text-muted-foreground">Lebar</p>
                  <p className="text-2xl font-semibold">{image.width} px</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tinggi</p>
                  <p className="text-2xl font-semibold">{image.height} px</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rasio aspek</p>
                  <p className="text-2xl font-semibold">
                    {aspectRatioLabel(image.width, image.height)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ukuran file</p>
                  <p className="text-2xl font-semibold">{formatBytes(image.file.size)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Megapiksel</p>
                  <p className="text-2xl font-semibold">
                    {((image.width * image.height) / 1_000_000).toFixed(2)} MP
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orientasi</p>
                  <p className="text-2xl font-semibold">
                    {image.width > image.height
                      ? "Landscape"
                      : image.width < image.height
                        ? "Portrait"
                        : "Persegi"}
                  </p>
                </div>
              </div>
            )}

            {showDimensionControls && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Text as="label" htmlFor="width" size="2" weight="medium" className="block">
                    Lebar (px)
                  </Text>
                  <TextField.Root
                    id="width"
                    type="number"
                    min={1}
                    max={10000}
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    aria-describedby="width-hint"
                  />
                  <p id="width-hint" className="text-xs text-muted-foreground">
                    {presets.label ?? "Target lebar output"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Text as="label" htmlFor="height" size="2" weight="medium" className="block">
                    Tinggi (px)
                  </Text>
                  <TextField.Root
                    id="height"
                    type="number"
                    min={1}
                    max={10000}
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                  />
                </div>
              </div>
            )}

            {mode === "compress" && activePreset.maxSizeMB && (
              <p className="text-sm text-muted-foreground">
                Target ukuran: di bawah {activePreset.maxSizeMB} MB
              </p>
            )}

            {mode === "convert" && (
              <p className="text-sm text-muted-foreground">
                Output: {activePreset.format?.toUpperCase() ?? "PNG"} (transparansi dipertahankan jika ada)
              </p>
            )}

            {!isDimensionsMode && (
              <Button
                size="3"
                className="w-full sm:w-auto"
                onClick={() => void processImage()}
                disabled={processing}
                aria-busy={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Memproses…
                  </>
                ) : (
                  cta
                )}
              </Button>
            )}

            {result && (
              <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-primary">Selesai!</p>
                    <p className="text-sm text-muted-foreground">
                      {result.width} × {result.height} px · {formatBytes(result.blob.size)}
                      {image.file.size > result.blob.size && (
                        <> · hemat {Math.round((1 - result.blob.size / image.file.size) * 100)}%</>
                      )}
                    </p>
                  </div>
                  <Button onClick={downloadResult}>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Unduh hasil
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg border bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.url}
                    alt="Pratinjau hasil pemrosesan"
                    className="mx-auto max-h-48 w-auto object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    </Card>
  );
}
