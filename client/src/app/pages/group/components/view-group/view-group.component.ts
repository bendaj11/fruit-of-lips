import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { cloneDeep, isEmpty } from "lodash";
import { Observable } from "rxjs";
import {
  CountedTimeFrame,
  DetailedGroup,
  Group,
} from "../../../../../assets/models/group.model";
import { TimeFramesSelectedEvent } from "../../../../features/time-frames-selection/container/time-frames-selection.component";
import { updateSelectedTimeFrames } from "../../actions/group.actions";
import { selectGroupById } from "../../reducer/group.reducer";

@Component({
  selector: "view-group",
  templateUrl: "./view-group.component.html",
  styleUrls: ["./view-group.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewGroupComponent {
  values = Object.values;
  showAvailableTimeFrameSelection = false;

  group$: Observable<Group>;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {
    const groupIdToView = route.snapshot.queryParamMap.get("id");
    this.group$ = this.store.select(selectGroupById(groupIdToView));
  }

  updateSelectedTimeFrames(
    { selectedTimeFramesIds, participantName }: TimeFramesSelectedEvent,
    detailedGroup: DetailedGroup
  ) {
    const groupTimeFrames = cloneDeep(detailedGroup.group.selectedTimeFrames);

    const updatedTimeFrames = groupTimeFrames.map<CountedTimeFrame>(
      (timeFrame) => {
        if (!selectedTimeFramesIds.includes(timeFrame.startTime)) {
          return timeFrame;
        }

        return {
          ...timeFrame,
          selectionCount: timeFrame.selectionCount + 1,
          participantsNames: [
            ...timeFrame.participantsNames,
            !isEmpty(participantName) ? participantName.trim() : "ANONYMOUS",
          ],
        };
      }
    );

    this.store.dispatch(
      updateSelectedTimeFrames({
        groupId: detailedGroup.group.id,
        selectedTimeFrames: updatedTimeFrames,
      })
    );

    this.showAvailableTimeFrameSelection = false;
  }

  trackByIndex(index: number) {
    return index;
  }

  showAvailableTimeFramesSelectionWindow() {
    this.showAvailableTimeFrameSelection = true;

    window.scroll(0, 0);
  }
}
