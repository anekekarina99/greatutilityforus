"use client";

import * as React from "react";
import { Download, FileText, Table, Upload } from "lucide-react";
import { Badge, Button, Card, Text } from "@radix-ui/themes";
import type { ToolContent } from "@/lib/tools";

interface PdfToCsvToolProps {
  tool: ToolContent & { mode: "pdf-to-csv" };
}

type DelimiterChoice = "comma" | "semicolon" | "tab";

const DELIMITER_CHARS: Record<DelimiterChoice, string> = {
  comma: ",",
  semicolon: ";",
  tab: "\t",
};

interface TextItem {
  str: string;
  x: number;
  y: number;
}

function clusterColumns(xs: number[], threshold: number): number[] {
  const sorted = [...xs].sort((a, b) => a - b);
  const anchors: number[] = [];
  let group: number[] = [];
  for (const x of sorted) {
    if (group.length === 0 || x - group[group.length - 1] <= threshold) {
      group.push(x);
    } else {
      anchors.push(group.reduce((s, v) => s + v, 0) / group.length);
      group = [x];
    }
  }
  if (group.length > 0) {
    anchors.push(group.reduce((s, v) => s + v, 0) / group.length);
  }
  return anchors;
}

function nearestIndex(anchors: number[], x: number): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < anchors.length; i += 1) {
    const dist = Math.abs(anchors[i] - x);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

function itemsToRows(items: TextItem[]): string[][] {
  if (items.length === 0) return [];

  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const rowGroups: TextItem[][] = [];
  const yTolerance = 4;

  for (const item of sorted) {
    const lastRow = rowGroups[rowGroups.length - 1];
    if (lastRow && Math.abs(lastRow[0].y - item.y) <= yTolerance) {
      lastRow.push(item);
    } else {
      rowGroups.push([item]);
    }
  }

  const allX = items.map((item) => item.x);
  const anchors = clusterColumns(allX, 14);
  const columnCount = Math.max(1, anchors.length);

  return rowGroups.map((group) => {
    const cells = new Array<string>(columnCount).fill("");
    const ordered = [...group].sort((a, b) => a.x - b.x);
    for (const item of ordered) {
      const col = nearestIndex(anchors, item.x);
      cells[col] = cells[col] ? `${cells[col]} ${item.str}` : item.str;
    }
    return cells.map((c) => c.trim());
  });
}

function toCsv(rows: string[][], delimiter: string): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          if (cell.includes('"') || cell.includes(delimiter) || cell.includes("\n")) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(delimiter)
    )
    .join("\r\n");
}

export function PdfToCsvTool({ tool }: PdfToCsvToolProps) {
  const presets = tool.presets;
  const [rows, setRows] = React.useState<string[][]>([]);
  const [fileName, setFileName] = React.useState("");
  const [delimiter, setDelimiter] = React.useState<DelimiterChoice>(
    (presets.delimiter as DelimiterChoice) ?? "comma"
  );
  const [status, setStatus] = React.useState<"idle" | "parsing" | "done">("idle");
  const [error, setError] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const previewRows = rows.slice(0, 8);
  const baseName = fileName.replace(/\.[^.]+$/, "") || "data";

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setRows([]);
    setStatus("parsing");
    setFileName(file.name);

    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs";

      const buffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      const allRows: string[][] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const items: TextItem[] = content.items
          .map((raw) => {
            const it = raw as { str?: string; transform?: number[] };
            if (!it.str || !it.transform || it.str.trim().length === 0) return null;
            return { str: it.str.trim(), x: it.transform[4], y: it.transform[5] };
          })
          .filter((it): it is TextItem => it !== null);
        allRows.push(...itemsToRows(items));
      }

      if (allRows.length === 0) {
        setError(
          "No text could be extracted. This is usually a scanned or image-only PDF, which needs OCR."
        );
        setStatus("idle");
        return;
      }

      setRows(allRows);
      setStatus("done");
    } catch {
      setError("Could not read that PDF. Make sure it is a valid, text-based PDF file.");
      setStatus("idle");
    }
  }

  function handleDownload() {
    if (rows.length === 0) return;
    const csv = toCsv(rows, DELIMITER_CHARS[delimiter]);
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <Card size="3" className="overflow-hidden">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">PDF to CSV</h2>
            <p className="text-sm text-muted-foreground">{presets.label}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/20 px-4 py-8 text-center transition-colors hover:bg-muted/40 focus-ring"
          aria-label="Unggah file PDF"
        >
          <Upload className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium">
            {status === "parsing" ? "Extracting…" : "Upload .pdf file"}
          </span>
          <span className="text-xs text-muted-foreground">
            {fileName ? fileName : "text-based PDF only · stays on your device"}
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {rows.length > 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Delimiter"
                value={delimiter}
                onChange={(value) => setDelimiter(value as DelimiterChoice)}
                options={[
                  { value: "comma", label: "Comma ( , )" },
                  { value: "semicolon", label: "Semicolon ( ; )" },
                  { value: "tab", label: "Tab" },
                ]}
              />
              <div className="flex items-end">
                <Button size="3" onClick={handleDownload} className="w-full">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CSV
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Table className="h-4 w-4 text-primary" aria-hidden="true" />
                  <p className="font-medium">Preview</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="soft" color="indigo">
                    {rows.length} rows
                  </Badge>
                  <Badge variant="soft" color="gray">
                    {columnCount} cols
                  </Badge>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border bg-background/70">
                <table className="w-full min-w-[320px] text-left text-xs">
                  <tbody>
                    {previewRows.map((row, r) => (
                      <tr key={r} className="border-t first:border-t-0">
                        {row.map((cell, c) => (
                          <td key={c} className="px-3 py-2 text-muted-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {rows.length > previewRows.length && (
                <p className="text-xs text-muted-foreground">
                  Showing first {previewRows.length} rows. The CSV includes all {rows.length} rows.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = React.useId();
  return (
    <div className="space-y-2">
      <Text as="label" htmlFor={id} size="2" weight="medium" className="block">
        {label}
      </Text>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
