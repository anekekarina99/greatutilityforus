"use client";

import * as React from "react";
import { Cat, Dog, Heart, RefreshCw, Trash2 } from "lucide-react";
import { Badge, Button, Card, Text } from "@radix-ui/themes";
import type { ToolContent } from "@/lib/tools";
import {
  getPetNames,
  type PetGender,
  type PetStyle,
} from "@/lib/petNames";

interface NameGeneratorToolProps {
  tool: ToolContent & { mode: "pet-name" };
}

type GenderFilter = PetGender | "any";
type StyleFilter = PetStyle | "any";

const GENDER_OPTIONS: { value: GenderFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unisex", label: "Unisex" },
];

const STYLE_OPTIONS: { value: StyleFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "cute", label: "Cute" },
  { value: "unique", label: "Unique" },
  { value: "funny", label: "Funny" },
  { value: "classic", label: "Classic" },
];

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function NameGeneratorTool({ tool }: NameGeneratorToolProps) {
  const presets = tool.presets;
  const animal = presets.animal ?? "cat";
  const count = presets.count ?? 12;
  const pool = React.useMemo(() => getPetNames(animal), [animal]);

  const [gender, setGender] = React.useState<GenderFilter>("any");
  const [style, setStyle] = React.useState<StyleFilter>("any");
  const [results, setResults] = React.useState<string[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const generate = React.useCallback(() => {
    const filtered = pool.filter((entry) => {
      const genderOk = gender === "any" || entry.gender === gender;
      const styleOk = style === "any" || entry.styles.includes(style as PetStyle);
      return genderOk && styleOk;
    });
    setResults(shuffle(filtered).slice(0, count).map((entry) => entry.name));
  }, [pool, gender, style, count]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  function toggleFavorite(name: string) {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  const AnimalIcon = animal === "cat" ? Cat : Dog;
  const matchCount = pool.filter((entry) => {
    const genderOk = gender === "any" || entry.gender === gender;
    const styleOk = style === "any" || entry.styles.includes(style as PetStyle);
    return genderOk && styleOk;
  }).length;

  return (
    <Card size="3" className="overflow-hidden">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <AnimalIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {animal === "cat" ? "Cat" : "Dog"} name generator
            </h2>
            <p className="text-sm text-muted-foreground">{presets.label}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FilterGroup
            legend="Gender"
            value={gender}
            options={GENDER_OPTIONS}
            onChange={(value) => setGender(value as GenderFilter)}
          />
          <FilterGroup
            legend="Style"
            value={style}
            options={STYLE_OPTIONS}
            onChange={(value) => setStyle(value as StyleFilter)}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Badge variant="soft" color="gray">
            {matchCount} names match
          </Badge>
          <Button size="3" onClick={generate}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Generate
          </Button>
        </div>

        {results.length === 0 ? (
          <p className="rounded-xl border bg-muted/20 py-8 text-center text-sm text-muted-foreground">
            No names match those filters. Try a different combination.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Generated names">
            {results.map((name) => {
              const isFav = favorites.includes(name);
              return (
                <li key={name}>
                  <div className="flex items-center justify-between gap-2 rounded-lg border bg-background/70 px-3 py-2">
                    <span className="font-medium">{name}</span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(name)}
                      className="rounded p-1 text-muted-foreground transition-colors hover:text-red-500 focus-ring"
                      aria-label={isFav ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
                      aria-pressed={isFav}
                    >
                      <Heart
                        className={`h-4 w-4 ${isFav ? "fill-red-500 text-red-500" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {favorites.length > 0 && (
          <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" aria-hidden="true" />
                <p className="font-medium">Favorites</p>
                <Badge variant="soft" color="red">
                  {favorites.length}
                </Badge>
              </div>
              <button
                type="button"
                onClick={() => setFavorites([])}
                className="inline-flex items-center gap-1 rounded text-sm text-muted-foreground hover:text-foreground focus-ring"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {favorites.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleFavorite(name)}
                  className="focus-ring rounded-full"
                  aria-label={`Remove ${name} from favorites`}
                >
                  <Badge variant="soft" color="indigo" size="2" className="cursor-pointer">
                    {name} ✕
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function FilterGroup({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <Text as="div" size="2" weight="medium">
        {legend}
      </Text>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors focus-ring ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-muted/40"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
