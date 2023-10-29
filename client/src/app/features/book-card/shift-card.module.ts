import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { ReactiveComponentModule } from "@ngrx/component";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageDirectionModule } from "../../directives/language-direction/language-direction.module";
import { KeyByLanguageModule } from "../../pipes/key-by-language/key-by-language.module";
import { ShiftCardComponent } from "./container/shift-card.component";

@NgModule({
  declarations: [ShiftCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    KeyByLanguageModule,
    ReactiveComponentModule,
    LanguageDirectionModule,
    MatRippleModule,
  ],
  exports: [ShiftCardComponent],
})
export class ShiftCardModule {}
