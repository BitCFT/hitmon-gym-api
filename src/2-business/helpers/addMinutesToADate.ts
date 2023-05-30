export function addMinutesToADate(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
