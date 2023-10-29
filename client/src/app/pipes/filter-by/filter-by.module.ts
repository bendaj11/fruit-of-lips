import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FilterByPipe } from "./filter-by.pipe";

@NgModule({
  declarations: [FilterByPipe],
  imports: [CommonModule],
  exports: [FilterByPipe],
})
export class FilterByModule {}
