import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageDirectionDirective } from "./language-direction.directive";

@NgModule({
  declarations: [LanguageDirectionDirective],
  imports: [CommonModule],
  exports: [LanguageDirectionDirective],
})
export class LanguageDirectionModule {}
