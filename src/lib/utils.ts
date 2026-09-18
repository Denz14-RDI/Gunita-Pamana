import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₱0';
  return '₱' + Math.round(num).toLocaleString('en-PH');
}

export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return '—';
  const date = typeof dateString === 'string' ? new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`) : dateString;
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function calculateNights(checkInStr: string, checkOutStr: string): number {
  if (!checkInStr || !checkOutStr) return 0;
  const start = new Date(`${checkInStr}T00:00:00`);
  const end = new Date(`${checkOutStr}T00:00:00`);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  const diffMs = end.getTime() - start.getTime();
  return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
}

export function generateReferenceCode(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `GP-2026-${randomNum}`;
}
