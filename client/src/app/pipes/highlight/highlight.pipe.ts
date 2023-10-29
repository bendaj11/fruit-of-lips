import { Pipe, PipeTransform } from "@angular/core";
import { toHighlightedText } from "../../../assets/utils/to-highlighted-text";

@Pipe({
  name: "highlight",
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchValue: string) {
    if (!searchValue || !value) {
      return value;
    }

    const regex = new RegExp(searchValue, "gi");

    return toHighlightedText(value, regex);
  }
}
