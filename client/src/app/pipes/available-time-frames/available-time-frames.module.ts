import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AvailableTimeFramesPipe } from "./available-time-frmaes.pipe";

@NgModule({
  declarations: [AvailableTimeFramesPipe],
  imports: [CommonModule],
  exports: [AvailableTimeFramesPipe],
})
export class AvailableTimeFramesModule {}
