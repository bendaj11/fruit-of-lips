import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HoverDirective } from "./hover.directive";

@NgModule({
  declarations: [HoverDirective],
  exports: [HoverDirective],
  imports: [CommonModule],
})
export class HoverDirectiveModule {}
