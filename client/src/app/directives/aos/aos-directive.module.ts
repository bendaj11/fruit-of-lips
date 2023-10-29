import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AosDirective } from "./aos.directive";

@NgModule({
  declarations: [AosDirective],
  exports: [AosDirective],
  imports: [CommonModule],
})
export class AosDirectiveModule {}
