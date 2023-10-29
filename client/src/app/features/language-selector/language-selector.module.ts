import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { LanguageSelectorComponent } from "./container/language-selector.component";

@NgModule({
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class LanguageSelectorModule {}
