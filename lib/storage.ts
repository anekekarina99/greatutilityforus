const STORAGE_PREFIX = "utilkit:";

export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch {
    // ignore
  }
}

export interface HistoryEntry {
  toolSlug: string;
  timestamp: number;
  label: string;
}

export function addToHistory(entry: HistoryEntry, maxItems = 10): void {
  const history = getStorageItem<HistoryEntry[]>("history", []);
  const filtered = history.filter((h) => h.toolSlug !== entry.toolSlug);
  const updated = [entry, ...filtered].slice(0, maxItems);
  setStorageItem("history", updated);
}

export function getHistory(): HistoryEntry[] {
  return getStorageItem<HistoryEntry[]>("history", []);
}

export interface UserPrefs {
  theme?: "light" | "dark" | "system";
  defaultQuality?: number;
}

export function getPrefs(): UserPrefs {
  return getStorageItem<UserPrefs>("prefs", {});
}

export function setPrefs(prefs: Partial<UserPrefs>): void {
  const current = getPrefs();
  setStorageItem("prefs", { ...current, ...prefs });
}
