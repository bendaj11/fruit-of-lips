import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { pick, values } from "lodash";
import { CountedTimeFrame } from "src/assets/models/group.model";

export type SelectionStage = "SELECTION" | "STAGED";

export type TimeFramesSelectedEvent = {
  participantName: string;
  selectedTimeFramesIds: number[];
};

@Component({
  selector: "time-frames-selection",
  templateUrl: "./time-frames-selection.component.html",
  styleUrls: ["./time-frames-selection.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeFramesSelectionComponent {
  @Input() countedTimeFrame: CountedTimeFrame[] = [];

  @Output() cancel = new EventEmitter<void>();
  @Output() timeFramesSelected = new EventEmitter<TimeFramesSelectedEvent>();

  pick = pick;
  username = "";
  values = values;
  arrayFrom = Array.from;
  selectionStage: SelectionStage = "SELECTION";

  selectedTimeFramesIds = new Set<number>();

  constructor(private readonly store: Store) {}

  toggleTimeFrameSelection(timeFrame: CountedTimeFrame) {
    if (this.isTimeFrameSelected(timeFrame)) {
      this.selectedTimeFramesIds.delete(timeFrame.startTime);
    } else {
      this.selectedTimeFramesIds.add(timeFrame.startTime);
    }
  }

  isTimeFrameSelected(timeFrame: CountedTimeFrame) {
    return this.selectedTimeFramesIds.has(timeFrame.startTime);
  }

  approveTimeFramesSelection() {
    this.timeFramesSelected.emit({
      participantName: this.username.substr(0, 20),
      selectedTimeFramesIds: [...this.selectedTimeFramesIds],
    });
  }
}
