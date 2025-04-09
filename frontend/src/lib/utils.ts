import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from 'marked';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function extractMermaidContent(markdown: string): {
  raw: string;
  oneLine: string;
  lines: string[];
} {
  const match = markdown.match(/```mermaid\s+([\s\S]*?)```/);
  if (!match) return { raw: '', oneLine: '', lines: [] };

  const raw = match[1].trim();
  const oneLine = raw.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

  return { raw, oneLine, lines };
}
