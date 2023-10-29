import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StyleByLanguageDirective } from "./style-by-language.directive";

@NgModule({
  declarations: [StyleByLanguageDirective],
  imports: [CommonModule],
  exports: [StyleByLanguageDirective],
})
export class StyleByLanguageDirectiveModule {}
