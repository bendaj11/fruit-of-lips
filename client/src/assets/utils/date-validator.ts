import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const DateValidator =
  (format = 'MM/dd/YYYY'): ValidatorFn =>
  (control: AbstractControl) => {
    const today = moment();
    const val = moment(control.value, format, true);

    if (!val.isValid()) {
      return { invalidDateFormat: true };
    } else if (val.isSameOrBefore(today)) {
      return { invalidDate: true };
    }

    return null;
  };
