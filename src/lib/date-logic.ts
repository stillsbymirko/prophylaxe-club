export type Quarter = 1 | 2 | 3 | 4;

export type ReminderMonths = 3 | 6 | 12;

export interface ReminderInfo {
  date: Date;
  quarter: Quarter;
  year: number;
  label: string;
}

const MONTH_NAMES = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export function getQuarter(month: number): Quarter {
  if (month <= 3) return 1;
  if (month <= 6) return 2;
  if (month <= 9) return 3;
  return 4;
}

export function getNextQuarter(
  year: number,
  quarter: Quarter,
): { year: number; quarter: Quarter } {
  if (quarter === 4) {
    return { year: year + 1, quarter: 1 };
  }
  return { year, quarter: (quarter + 1) as Quarter };
}

/**
 * Returns the booking open date for a given quarter.
 * Q1 (Jan–Mar) opens Dec 1 of previous year
 * Q2 (Apr–Jun) opens Mar 1
 * Q3 (Jul–Sep) opens Jun 1
 * Q4 (Oct–Dec) opens Sep 1
 */
export function getBookingOpenDate(year: number, quarter: Quarter): Date {
  switch (quarter) {
    case 1:
      return new Date(year - 1, 11, 1, 9, 0, 0);
    case 2:
      return new Date(year, 2, 1, 9, 0, 0);
    case 3:
      return new Date(year, 5, 1, 9, 0, 0);
    case 4:
      return new Date(year, 8, 1, 9, 0, 0);
  }
}

export function formatGermanDate(date: Date): string {
  return `${date.getDate()}. ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatQuarterLabel(quarter: Quarter, year: number): string {
  const ranges: Record<Quarter, string> = {
    1: "Jan–Mär",
    2: "Apr–Jun",
    3: "Jul–Sep",
    4: "Okt–Dez",
  };
  return `Q${quarter} ${year} (${ranges[quarter]})`;
}

/**
 * Calculates the reminder date based on months offset from today.
 * Target month → next quarter → booking open date for that quarter.
 */
export function calculateReminderDate(
  fromDate: Date,
  monthsOffset: number,
): ReminderInfo {
  const target = new Date(fromDate);
  target.setMonth(target.getMonth() + monthsOffset);

  const currentQuarter = getQuarter(target.getMonth() + 1);
  const targetYear = target.getFullYear();
  const next = getNextQuarter(targetYear, currentQuarter);
  const date = getBookingOpenDate(next.year, next.quarter);

  return {
    date,
    quarter: next.quarter,
    year: next.year,
    label: formatQuarterLabel(next.quarter, next.year),
  };
}

export function getThreeMonthReminder(fromDate = new Date()): ReminderInfo {
  return calculateReminderDate(fromDate, 3);
}

export function getHalfYearReminder(fromDate = new Date()): ReminderInfo {
  return calculateReminderDate(fromDate, 6);
}

export function getFullYearReminder(fromDate = new Date()): ReminderInfo {
  return calculateReminderDate(fromDate, 12);
}

export function getReminderForMonths(
  months: ReminderMonths,
  fromDate = new Date(),
): ReminderInfo {
  switch (months) {
    case 3:
      return getThreeMonthReminder(fromDate);
    case 6:
      return getHalfYearReminder(fromDate);
    case 12:
      return getFullYearReminder(fromDate);
  }
}

export function parseReminderMonths(
  value: string | undefined,
): ReminderMonths | null {
  if (value === "3" || value === "6" || value === "12") {
    return Number(value) as ReminderMonths;
  }
  return null;
}
