import { Pipe, PipeTransform } from "@angular/core";
import { DictionaryNum } from "@ngrx/entity/src/models";
import { minBy, omitBy, values } from "lodash";
import { CountedTimeFrame } from "../../../assets/models/group.model";

@Pipe({
  name: "availableTimeFrames",
})
export class AvailableTimeFramesPipe implements PipeTransform {
  transform(timeFrames: CountedTimeFrame[]) {
    const minReadSegmentByCount = minBy(
      timeFrames,
      (readSegment) => readSegment.selectionCount
    );

    return timeFrames.filter(
      (timeFrame) =>
        timeFrame?.selectionCount !== minReadSegmentByCount.selectionCount
    );
  }
}
