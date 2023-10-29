import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { HoverDirectiveModule } from "../../directives/hover/hover-directive.module";
import { LanguageDirectionModule } from "../../directives/language-direction/language-direction.module";
import { FeaturePreviewCardComponent } from "./container/feature-preview-card.component";

@NgModule({
  declarations: [FeaturePreviewCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    HoverDirectiveModule,
    LanguageDirectionModule,
  ],
  exports: [FeaturePreviewCardComponent],
})
export class FeaturePreviewCardModule {}
