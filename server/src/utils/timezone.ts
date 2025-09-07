/**
 * Timezone utilities for Bucharest timezone
 * Bucharest uses EET (UTC+2) in winter and EEST (UTC+3) in summer
 */

/**
 * Get current date and time in Bucharest timezone
 * @returns Date object in Bucharest timezone
 */
export function getBucharestTime(): Date {
  return new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Bucharest"}));
}

/**
 * Get current date and time in Bucharest timezone as ISO string
 * @returns ISO string in Bucharest timezone
 */
export function getBucharestTimeISO(): string {
  const bucharestTime = getBucharestTime();
  return bucharestTime.toISOString();
}

/**
 * Format date in Bucharest timezone with custom format
 * @param date - Date to format (optional, defaults to current time)
 * @param format - Format string (optional, defaults to ISO)
 * @returns Formatted date string
 */
export function formatBucharestTime(date?: Date, format: 'iso' | 'local' | 'full' = 'iso'): string {
  const bucharestTime = date ? new Date(date.toLocaleString("en-US", {timeZone: "Europe/Bucharest"})) : getBucharestTime();
  
  switch (format) {
    case 'local':
      return bucharestTime.toLocaleString('ro-RO', {
        timeZone: 'Europe/Bucharest',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    case 'full':
      return bucharestTime.toLocaleString('ro-RO', {
        timeZone: 'Europe/Bucharest',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    case 'iso':
    default:
      return bucharestTime.toISOString();
  }
}

/**
 * Get timezone offset for Bucharest
 * @returns Timezone offset in minutes
 */
export function getBucharestTimezoneOffset(): number {
  const bucharestTime = getBucharestTime();
  const utcTime = new Date();
  return (bucharestTime.getTime() - utcTime.getTime()) / (1000 * 60);
}

/**
 * Check if Bucharest is currently in daylight saving time
 * @returns true if in summer time (EEST), false if in winter time (EET)
 */
export function isBucharestDST(): boolean {
  const jan = new Date(new Date().getFullYear(), 0, 1);
  const jul = new Date(new Date().getFullYear(), 6, 1);
  
  const janOffset = new Date(jan.toLocaleString("en-US", {timeZone: "Europe/Bucharest"})).getTimezoneOffset();
  const julOffset = new Date(jul.toLocaleString("en-US", {timeZone: "Europe/Bucharest"})).getTimezoneOffset();
  
  return janOffset !== julOffset;
}
