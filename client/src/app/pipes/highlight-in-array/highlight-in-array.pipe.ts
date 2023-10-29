import { Pipe, PipeTransform } from "@angular/core";
import { concat, isEmpty, partition } from "lodash";
import { toHighlightedText } from "../../../assets/utils/to-highlighted-text";

@Pipe({
  name: "highlightInArray",
})
export class HighlightInArrayPipe implements PipeTransform {
  transform(value: string[], searchValue: string) {
    if (!searchValue || isEmpty(value)) {
      return value;
    }

    const regex = new RegExp(searchValue, "gi");

    const partitionedBySearchMatch = partition(value, (item) =>
      item.match(regex)
    );

    return concat(
      partitionedBySearchMatch[0]?.map((matchedItem) =>
        toHighlightedText(matchedItem, regex)
      ),
      partitionedBySearchMatch[1]
    );
  }
}
