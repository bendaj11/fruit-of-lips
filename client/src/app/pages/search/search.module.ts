import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { ReactiveComponentModule } from "@ngrx/component";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageDirectionModule } from "../../directives/language-direction/language-direction.module";
import { SearchResultCardModule } from "../../features/search-result-card/search-result-card.module";
import { GraphQLModule } from "../../graphql.module";
import { DetailedGroupModule } from "../../pipes/detailed-group/detailed-group.module";
import { FilterByModule } from "../../pipes/filter-by/filter-by.module";
import { HighlightModule } from "../../pipes/highlight/highlight.module";
import { SearchComponent } from "./container/search.component";

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FlexModule,
    FormsModule,
    GraphQLModule,
    FilterByModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    HighlightModule,
    TranslateModule,
    MatFormFieldModule,
    DetailedGroupModule,
    SearchResultCardModule,
    LanguageDirectionModule,
    ReactiveComponentModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([{ path: "search", component: SearchComponent }]),
  ],
  exports: [RouterModule],
})
export class SearchModule {}
