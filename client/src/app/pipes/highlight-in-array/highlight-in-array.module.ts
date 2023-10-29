import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HighlightInArrayPipe } from "./highlight-in-array.pipe";

@NgModule({
  declarations: [HighlightInArrayPipe],
  imports: [CommonModule],
  exports: [HighlightInArrayPipe],
})
export class HighlightInArrayModule {}
