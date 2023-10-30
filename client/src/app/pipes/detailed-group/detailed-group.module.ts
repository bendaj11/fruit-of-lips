import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DetailedGroupPipe } from "./detailed-group.pipe";

@NgModule({
  declarations: [DetailedGroupPipe],
  imports: [CommonModule],
  providers: [DetailedGroupPipe],
  exports: [DetailedGroupPipe],
})
export class DetailedGroupModule {}
