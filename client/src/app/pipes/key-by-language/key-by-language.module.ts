import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { KeyByLanguagePipe } from "./key-by-language.pipe";

@NgModule({
  declarations: [KeyByLanguagePipe],
  imports: [CommonModule],
  exports: [KeyByLanguagePipe],
})
export class KeyByLanguageModule {}
