export const IDateServiceToken = Symbol.for('IDateServiceToken');

export interface IDateService {
  addMinutesToADate(date: Date, minutes: number): Date;
  checkIfIsAfter(date: Date, dateToCompare: Date): boolean;
}
