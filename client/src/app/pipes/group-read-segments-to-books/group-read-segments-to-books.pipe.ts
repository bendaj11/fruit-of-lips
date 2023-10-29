import { Pipe, PipeTransform } from "@angular/core";
import { map, maxBy, pick, range, sortBy } from "lodash";
import {
  CountedTimeFrame,
  Shift,
  NamedTimeFrame,
} from "../../../assets/models/group.model";

@Pipe({
  name: "groupToShifts",
})
export class GroupToShiftsPipe implements PipeTransform {
  transform(countedTimeFrames: CountedTimeFrame[]) {
    const largestTimeFrameSelectCount = maxBy(
      countedTimeFrames,
      (countedTimeFrame) => countedTimeFrame.selectionCount
    ).selectionCount;

    const shits: Shift[] = range(0, largestTimeFrameSelectCount).map<Shift>(
      (shiftNumber) =>
        countedTimeFrames.map((countedTimeFrame) =>
          GroupToShiftsPipe.createNamedTimeFrame(countedTimeFrame, shiftNumber)
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
