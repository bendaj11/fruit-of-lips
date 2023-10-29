import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupToShiftsPipe } from "./group-read-segments-to-books.pipe";

@NgModule({
  declarations: [GroupToShiftsPipe],
  imports: [CommonModule],
  exports: [GroupToShiftsPipe],
})
export class GroupReadSegmentsToBooksModule {}
