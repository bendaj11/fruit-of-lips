import { Pipe, PipeTransform } from "@angular/core";
import { isNil, map, maxBy, pick, range, sortBy } from "lodash";
import {
  CountedTimeFrame,
  Shift,
  NamedTimeFrame,
} from "../../../assets/models/group.model";

@Pipe({
  name: "timeFramesToShifts",
})
export class TimeFramesToShiftsPipe implements PipeTransform {
  transform(countedTimeFrames: CountedTimeFrame[]) {
    const mostCountedTimeFrame = maxBy(
      countedTimeFrames,
      (countedTimeFrame) => countedTimeFrame.selectionCount
    )?.selectionCount;

    if (isNil(mostCountedTimeFrame)) {
      return [];
    }

    const shits: Shift[] = range(0, mostCountedTimeFrame).map<Shift>(
      (shiftNumber) =>
        countedTimeFrames.map((countedTimeFrame) =>
          TimeFramesToShiftsPipe.createNamedTimeFrame(
            countedTimeFrame,
            shiftNumber
          )
        )
    );

    return map(shits, (shift) =>
      sortBy(shift, (namedTimeFrame) => namedTimeFrame.startTime)
    );
  }

  private static createNamedTimeFrame(
    countedReadSegment: CountedTimeFrame,
    usernameIndexInList: number
  ): NamedTimeFrame {
    return {
      ...pick(countedReadSegment, ["title", "startTime", "endTime"]),
      participant: countedReadSegment.participantsNames[usernameIndexInList],
    };
  }
}
