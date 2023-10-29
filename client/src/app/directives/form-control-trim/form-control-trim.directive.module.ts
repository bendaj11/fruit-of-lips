import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormControlTrimDirective } from "./form-control-trim.directive";

@NgModule({
  declarations: [FormControlTrimDirective],
  exports: [FormControlTrimDirective],
  imports: [CommonModule],
})
export class FormControlTrimDirectiveModule {}
