import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimeFramesToShiftsPipe } from "./group-time-frames-to-shifts.pipe";

@NgModule({
  imports: [CommonModule],
  exports: [TimeFramesToShiftsPipe],
  declarations: [TimeFramesToShiftsPipe],
})
export class GroupTimeFramesToShiftsModule {}
