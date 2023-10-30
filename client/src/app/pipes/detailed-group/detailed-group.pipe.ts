import { Pipe, PipeTransform } from "@angular/core";
import { cloneDeep, isNil, minBy, partition, sumBy, uniq } from "lodash";
import { DetailedGroup, Group } from "../../../assets/models/group.model";

@Pipe({
  name: "detailedGroup",
})
export class DetailedGroupPipe implements PipeTransform {
  transform(group: Group): DetailedGroup {
    const totalSelectedHours = sumBy(
      group.selectedTimeFrames,
      (timeFrame) => timeFrame.selectionCount
    );

    const allParticipantsNames =
      group.selectedTimeFrames
        ?.map((timeFrame) => timeFrame.participantsNames)
        .flat() ?? [];
    const [anonymousParticipants, namedParticipants] = partition(
      allParticipantsNames,
      (participantName) => participantName === "ANONYMOUS"
    );
    const totalParticipantsCount =
      uniq(namedParticipants).length + anonymousParticipants.length;

    return {
      group,
      totalSelectedHours,
      totalParticipantsCount,
    };
  }
}
