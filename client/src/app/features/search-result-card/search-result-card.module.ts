import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageDirectionModule } from "../../directives/language-direction/language-direction.module";
import { HighlightInArrayModule } from "../../pipes/highlight-in-array/highlight-in-array.module";
import { HighlightModule } from "../../pipes/highlight/highlight.module";
import { IsExpiredModule } from "../../pipes/is-expired/is-expired.module";
import { SearchResultCardComponent } from "./container/search-result-card.component";

@NgModule({
  declarations: [SearchResultCardComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule,
    MatCardModule,
    TranslateModule,
    HighlightModule,
    IsExpiredModule,
    HighlightInArrayModule,
    LanguageDirectionModule,
    MatProgressSpinnerModule,
  ],
  exports: [SearchResultCardComponent],
})
export class SearchResultCardModule {}
