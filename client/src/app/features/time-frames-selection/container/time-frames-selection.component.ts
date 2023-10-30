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

  selectedTimeFrames: CountedTimeFrame[] = [];

  toggleTimeFrameSelection(timeFrame: CountedTimeFrame) {
    if (this.isTimeFrameSelected(timeFrame)) {
      this.selectedTimeFrames.splice(
        this.selectedTimeFrames.indexOf(timeFrame),
        1
      );
    } else {
      this.selectedTimeFrames.push(timeFrame);
    }
  }

  isTimeFrameSelected(timeFrame: CountedTimeFrame) {
    return this.selectedTimeFrames.indexOf(timeFrame) !== -1;
  }

  approveTimeFramesSelection() {
    this.timeFramesSelected.emit({
      participantName: this.username.substr(0, 20),
      selectedTimeFramesIds: this.selectedTimeFrames.map(
        (timeFrame) => timeFrame.startTime
      ),
    });
  }
}
