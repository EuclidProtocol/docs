// src/components/widgets/shared/theme.ts
import type { WidgetTheme } from "./types";

export const DEFAULT_THEME: WidgetTheme = {
  accent: "#092322",
  surface: "#ffffff",
  panel: "#f2f4f6",
  border: "rgba(17,24,28,0.12)",
  text: "#11181c",
  muted: "#4b5563",
};

export function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(9,35,34,${alpha})`;
  return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${alpha})`;
}

export function applyTheme(el: HTMLElement, theme: Partial<WidgetTheme>): void {
  const merged = { ...DEFAULT_THEME, ...theme };
  el.style.setProperty("--w-accent", merged.accent);
  el.style.setProperty("--w-accent-soft", hexToRgba(merged.accent, 0.08));
  el.style.setProperty("--w-surface", merged.surface);
  el.style.setProperty("--w-panel", merged.panel);
  el.style.setProperty("--w-border", merged.border);
  el.style.setProperty("--w-text", merged.text);
  el.style.setProperty("--w-muted", merged.muted);
}
