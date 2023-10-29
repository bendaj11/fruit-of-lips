import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

@Pipe({
  name: "isExpired",
})
export class IsExpiredPipe implements PipeTransform {
  transform(value: string) {
    const today = moment();
    const dateToCheck = moment(value);

    return today.isAfter(dateToCheck);
  }
}
