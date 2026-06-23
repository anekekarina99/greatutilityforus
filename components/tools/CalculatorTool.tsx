"use client";

import * as React from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Badge, Button, Card, Text, TextField } from "@radix-ui/themes";
import type { ToolContent } from "@/lib/tools";

interface CalculatorToolProps {
  tool: ToolContent & { mode: "compound-interest" };
}

interface GrowthRow {
  year: number;
  value: number;
  principal: number;
  interest: number;
}

const CURRENCIES = ["USD", "CAD", "IDR", "INR", "EUR", "GBP"] as const;

const COMPOUNDING_OPTIONS = [
  { value: "daily", label: "Daily", periodsPerYear: 365 },
  { value: "weekly", label: "Weekly", periodsPerYear: 52 },
  { value: "monthly", label: "Monthly", periodsPerYear: 12 },
  { value: "quarterly", label: "Quarterly", periodsPerYear: 4 },
  { value: "semiannually", label: "Semi-annually", periodsPerYear: 2 },
  { value: "annually", label: "Annually", periodsPerYear: 1 },
  { value: "continuously", label: "Continuously", periodsPerYear: 0 },
] as const;

type Currency = (typeof CURRENCIES)[number];
type ContributionFrequency = "monthly" | "yearly";
type CompoundingFrequency = (typeof COMPOUNDING_OPTIONS)[number]["value"];

function toNumber(value: string, fallback = 0): number {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getMonthlyGrowthFactor(ratePercent: number, frequency: CompoundingFrequency): number {
  const annualRate = Math.max(ratePercent, -99.99) / 100;
  const option = COMPOUNDING_OPTIONS.find((item) => item.value === frequency);
  if (!option || option.value === "continuously") {
    return Math.exp(annualRate / 12);
  }
  return Math.pow(1 + annualRate / option.periodsPerYear, option.periodsPerYear / 12);
}

function calculateGrowth(params: {
  principal: number;
  rate: number;
  years: number;
  contribution: number;
  contributionFrequency: ContributionFrequency;
  compoundingFrequency: CompoundingFrequency;
}): { futureValue: number; totalPrincipal: number; totalInterest: number; rows: GrowthRow[] } {
  const months = Math.max(1, Math.round(params.years * 12));
  const monthlyFactor = getMonthlyGrowthFactor(params.rate, params.compoundingFrequency);
  let value = Math.max(0, params.principal);
  let totalPrincipal = Math.max(0, params.principal);
  const contribution = Math.max(0, params.contribution);
  const rows: GrowthRow[] = [];

  for (let month = 1; month <= months; month += 1) {
    value *= monthlyFactor;

    if (params.contributionFrequency === "monthly") {
      value += contribution;
      totalPrincipal += contribution;
    }

    if (params.contributionFrequency === "yearly" && month % 12 === 0) {
      value += contribution;
      totalPrincipal += contribution;
    }

    if (month % 12 === 0 || month === months) {
      rows.push({
        year: Math.ceil(month / 12),
        value,
        principal: totalPrincipal,
        interest: value - totalPrincipal,
      });
    }
  }

  return {
    futureValue: value,
    totalPrincipal,
    totalInterest: value - totalPrincipal,
    rows,
  };
}

export function CalculatorTool({ tool }: CalculatorToolProps) {
  const presets = tool.presets;
  const [principal, setPrincipal] = React.useState(String(presets.principal ?? 10000));
  const [rate, setRate] = React.useState(String(presets.rate ?? 7));
  const [years, setYears] = React.useState(String(presets.years ?? 10));
  const [contribution, setContribution] = React.useState(String(presets.contribution ?? 100));
  const [contributionFrequency, setContributionFrequency] =
    React.useState<ContributionFrequency>(presets.contributionFrequency ?? "monthly");
  const [compoundingFrequency, setCompoundingFrequency] =
    React.useState<CompoundingFrequency>(presets.compoundingFrequency ?? "monthly");
  const [currency, setCurrency] = React.useState<Currency>(presets.currency ?? "USD");

  const result = React.useMemo(
    () =>
      calculateGrowth({
        principal: toNumber(principal),
        rate: toNumber(rate),
        years: toNumber(years, 1),
        contribution: toNumber(contribution),
        contributionFrequency,
        compoundingFrequency,
      }),
    [principal, rate, years, contribution, contributionFrequency, compoundingFrequency]
  );

  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat("en", {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "IDR" ? 0 : 2,
      }),
    [currency]
  );

  const maxValue = Math.max(...result.rows.map((row) => row.value), result.futureValue, 1);

  return (
    <Card size="3" className="overflow-hidden">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Compound interest inputs</h2>
              <p className="text-sm text-muted-foreground">{presets.label}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Initial amount" value={principal} onChange={setPrincipal} />
            <Field label="Annual interest rate (%)" value={rate} onChange={setRate} />
            <Field label="Years" value={years} onChange={setYears} />
            <Field label="Contribution amount" value={contribution} onChange={setContribution} />

            <SelectField
              label="Contribution frequency"
              value={contributionFrequency}
              onChange={(value) => setContributionFrequency(value as ContributionFrequency)}
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
            />
            <SelectField
              label="Compounding frequency"
              value={compoundingFrequency}
              onChange={(value) => setCompoundingFrequency(value as CompoundingFrequency)}
              options={COMPOUNDING_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
            />
            <SelectField
              label="Currency"
              value={currency}
              onChange={(value) => setCurrency(value as Currency)}
              options={CURRENCIES.map((item) => ({ value: item, label: item }))}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Future value</p>
              <p className="text-3xl font-bold tracking-tight">
                {formatter.format(result.futureValue)}
              </p>
            </div>
            <Badge color={result.totalInterest >= 0 ? "green" : "red"} variant="soft">
              {result.totalInterest >= 0 ? "Growth" : "Loss"}
            </Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SummaryCard label="Total principal" value={formatter.format(result.totalPrincipal)} />
            <SummaryCard label="Total interest" value={formatter.format(result.totalInterest)} />
          </div>

          <div className="rounded-lg border bg-background/70 p-3">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
              <p className="font-medium">Growth by year</p>
            </div>
            <div className="space-y-2">
              {result.rows.slice(0, 12).map((row) => (
                <div key={row.year} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Y{row.year}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.max(4, (row.value / maxValue) * 100)}%` }}
                    />
                  </div>
                  <span className="font-medium">{formatter.format(row.value)}</span>
                </div>
              ))}
            </div>
            {result.rows.length > 12 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Showing first 12 rows. Final result includes the full {result.rows.length}-year term.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Principal</th>
              <th className="px-4 py-3 font-medium">Interest</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.year} className="border-t">
                <td className="px-4 py-3">{row.year}</td>
                <td className="px-4 py-3 font-medium">{formatter.format(row.value)}</td>
                <td className="px-4 py-3">{formatter.format(row.principal)}</td>
                <td className="px-4 py-3">{formatter.format(row.interest)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = React.useId();
  return (
    <div className="space-y-2">
      <Text as="label" htmlFor={id} size="2" weight="medium" className="block">
        {label}
      </Text>
      <TextField.Root
        id={id}
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
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

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background/70 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
