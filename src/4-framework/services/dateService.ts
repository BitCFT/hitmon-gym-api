import { IDateService } from '@business/services/iDateService';
import { injectable } from 'inversify';
import moment from 'moment';

@injectable()
export class DateService implements IDateService {
  addMinutesToADate(date: Date, minutes: number): Date {
    return moment(date).add(minutes, 'minutes').toDate();
  }

  checkIfIsAfter(date: Date, dateToCompare: Date): boolean {
    return moment(date).isAfter(dateToCompare);
  }
}
