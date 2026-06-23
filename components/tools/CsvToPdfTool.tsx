"use client";

import * as React from "react";
import { Download, FileText, Table, Upload } from "lucide-react";
import { Badge, Button, Card, Text } from "@radix-ui/themes";
import type { ToolContent } from "@/lib/tools";

interface CsvToPdfToolProps {
  tool: ToolContent & { mode: "csv-to-pdf" };
}

type DelimiterChoice = "auto" | "comma" | "semicolon" | "tab";
type Orientation = "portrait" | "landscape";
type PageSize = "a4" | "letter" | "legal";

const DELIMITER_CHARS: Record<Exclude<DelimiterChoice, "auto">, string> = {
  comma: ",",
  semicolon: ";",
  tab: "\t",
};

function detectDelimiter(text: string): string {
  const firstLine = text.split(/\r?\n/).find((line) => line.trim().length > 0) ?? "";
  const candidates: [string, number][] = [
    [",", (firstLine.match(/,/g) ?? []).length],
    [";", (firstLine.match(/;/g) ?? []).length],
    ["\t", (firstLine.match(/\t/g) ?? []).length],
  ];
  candidates.sort((a, b) => b[1] - a[1]);
  return candidates[0][1] > 0 ? candidates[0][0] : ",";
}

function parseCsv(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === delimiter) {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim().length > 0));
}

export function CsvToPdfTool({ tool }: CsvToPdfToolProps) {
  const presets = tool.presets;
  const [raw, setRaw] = React.useState(presets.sample ?? "");
  const [fileName, setFileName] = React.useState<string>("");
  const [delimiter, setDelimiter] = React.useState<DelimiterChoice>(presets.delimiter ?? "auto");
  const [orientation, setOrientation] = React.useState<Orientation>(presets.orientation ?? "portrait");
  const [pageSize, setPageSize] = React.useState<PageSize>(presets.pageSize ?? "a4");
  const [hasHeader, setHasHeader] = React.useState<boolean>(presets.hasHeader ?? true);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const activeDelimiter = React.useMemo(
    () => (delimiter === "auto" ? detectDelimiter(raw) : DELIMITER_CHARS[delimiter]),
    [delimiter, raw]
  );

  const rows = React.useMemo(
    () => (raw.trim().length > 0 ? parseCsv(raw, activeDelimiter) : []),
    [raw, activeDelimiter]
  );

  const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const previewRows = rows.slice(0, 8);
  const baseName = fileName.replace(/\.[^.]+$/, "") || "data";

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setRaw(String(reader.result ?? ""));
    reader.onerror = () => setError("Could not read that file. Please try another CSV.");
    reader.readAsText(file);
  }

  async function handleDownload() {
    if (rows.length === 0) {
      setError("Add some CSV data first.");
      return;
    }
    setError("");
    setIsGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF({ orientation, unit: "pt", format: pageSize });
      const head = hasHeader && rows.length > 1 ? [rows[0]] : undefined;
      const body = hasHeader && rows.length > 1 ? rows.slice(1) : rows;

      autoTable(doc, {
        head,
        body,
        margin: { top: 36, right: 24, bottom: 36, left: 24 },
        styles: { fontSize: 8, cellPadding: 4, overflow: "linebreak", valign: "middle" },
        headStyles: { fillColor: [79, 70, 229], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 245, 250] },
        theme: "grid",
      });

      doc.save(`${baseName}.pdf`);
    } catch {
      setError("Something went wrong while generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card size="3" className="overflow-hidden">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">CSV to PDF</h2>
            <p className="text-sm text-muted-foreground">{presets.label}</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/20 px-4 py-6 text-center transition-colors hover:bg-muted/40 focus-ring"
              aria-label="Unggah file CSV"
            >
              <Upload className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">Upload .csv file</span>
              <span className="text-xs text-muted-foreground">
                {fileName ? fileName : "or paste your data below · stays on your device"}
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.tsv,.txt,text/csv"
              className="sr-only"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />

            <div className="space-y-2">
              <Text as="label" htmlFor="csv-input" size="2" weight="medium" className="block">
                CSV data
              </Text>
              <textarea
                id="csv-input"
                value={raw}
                onChange={(event) => {
                  setRaw(event.target.value);
                  setError("");
                }}
                rows={8}
                spellCheck={false}
                placeholder="name,email,city&#10;Ada,ada@example.com,London"
                className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-mono text-xs focus-ring"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Delimiter"
                value={delimiter}
                onChange={(value) => setDelimiter(value as DelimiterChoice)}
                options={[
                  { value: "auto", label: "Auto-detect" },
                  { value: "comma", label: "Comma ( , )" },
                  { value: "semicolon", label: "Semicolon ( ; )" },
                  { value: "tab", label: "Tab" },
                ]}
              />
              <SelectField
                label="Page size"
                value={pageSize}
                onChange={(value) => setPageSize(value as PageSize)}
                options={[
                  { value: "a4", label: "A4" },
                  { value: "letter", label: "Letter" },
                  { value: "legal", label: "Legal" },
                ]}
              />
              <SelectField
                label="Orientation"
                value={orientation}
                onChange={(value) => setOrientation(value as Orientation)}
                options={[
                  { value: "portrait", label: "Portrait" },
                  { value: "landscape", label: "Landscape" },
                ]}
              />
              <div className="space-y-2">
                <Text as="label" htmlFor="csv-header" size="2" weight="medium" className="block">
                  First row is header
                </Text>
                <label
                  htmlFor="csv-header"
                  className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <input
                    id="csv-header"
                    type="checkbox"
                    checked={hasHeader}
                    onChange={(event) => setHasHeader(event.target.checked)}
                    className="h-4 w-4"
                  />
                  Treat first row as table header
                </label>
              </div>
            </div>

            <Button
              size="3"
              onClick={handleDownload}
              disabled={rows.length === 0 || isGenerating}
              className="w-full"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {isGenerating ? "Generating…" : "Download PDF"}
            </Button>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
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

            {rows.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Your table preview will appear here.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border bg-background/70">
                <table className="w-full min-w-[320px] text-left text-xs">
                  {hasHeader && (
                    <thead className="bg-primary/10 text-foreground">
                      <tr>
                        {rows[0].map((cell, i) => (
                          <th key={i} className="px-3 py-2 font-semibold">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {(hasHeader ? previewRows.slice(1) : previewRows).map((row, r) => (
                      <tr key={r} className="border-t">
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
            )}

            {rows.length > previewRows.length && (
              <p className="text-xs text-muted-foreground">
                Showing first {hasHeader ? previewRows.length - 1 : previewRows.length} rows. The PDF
                includes all {hasHeader ? rows.length - 1 : rows.length} data rows.
              </p>
            )}
          </div>
        </div>
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
