export default function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export function utcDayRange(d: Date) {
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
  const end   = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0, 0));
  return { start, end };
}

export function parseDate(input?: string | Date | null): Date | undefined {
  if (!input) return undefined;
  const d = input instanceof Date ? input : new Date(input);
  return isNaN(d.getTime()) ? undefined : d;
}