export const IDateServiceToken = Symbol.for('IDateServiceToken');

export interface IDateService {
  addMinutesToADate(date: Date, minutes: number): Date;
  subtractMinutesToADate(date: Date, minutes: number): Date;
}
