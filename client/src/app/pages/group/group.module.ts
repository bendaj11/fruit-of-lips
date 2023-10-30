import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { ReactiveComponentModule } from "@ngrx/component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { HoverDirectiveModule } from "../../directives/hover/hover-directive.module";
import { LanguageDirectionModule } from "../../directives/language-direction/language-direction.module";
import { ShiftCardModule } from "../../features/book-card/shift-card.module";
import { TimeFramesSelectionModule } from "../../features/time-frames-selection/time-frames-selection.module";
import { CustomLottieModule } from "../../features/lottie/custom-lottie.module";
import { SearchResultCardModule } from "../../features/search-result-card/search-result-card.module";
import { GraphQLModule } from "../../graphql.module";
import { UpdateGroupGuard } from "../../guards/update-group.guard";
import { ViewGroupGuard } from "../../guards/view-group.guard";
import { DetailedGroupModule } from "../../pipes/detailed-group/detailed-group.module";
import { GroupTimeFramesToShiftsModule } from "../../pipes/group-time-frames-to-shifts/group-time-frames-to-shifts.module";
import { HighlightInArrayModule } from "../../pipes/highlight-in-array/highlight-in-array.module";
import { IsExpiredModule } from "../../pipes/is-expired/is-expired.module";
import { KeyByLanguageModule } from "../../pipes/key-by-language/key-by-language.module";
import { GroupNotFoundComponent } from "./components/group-not-found/group-not-found.component";
import { UpsertGroupComponent } from "./components/upsert-group/upsert-group.component";
import { ViewGroupComponent } from "./components/view-group/view-group.component";
import { GroupEffects } from "./effects/group.effects";
import { ChapterQueriesService } from "./services/chapter-queries.service";
import { GroupQueriesService } from "./services/group-queries.service";
import { FormControlTrimDirectiveModule } from "../../directives/form-control-trim/form-control-trim.directive.module";
import { groupsFeatureKey, groupsStateReducer } from "./reducer/group.reducer";

@NgModule({
  declarations: [
    ViewGroupComponent,
    UpsertGroupComponent,
    GroupNotFoundComponent,
  ],
  providers: [
    ViewGroupGuard,
    UpdateGroupGuard,
    GroupQueriesService,
    ChapterQueriesService,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
  ],
  imports: [
    CommonModule,
    FlexModule,
    GraphQLModule,
    MatCardModule,
    MatInputModule,
    TranslateModule,
    MatSelectModule,
    IsExpiredModule,
    MatButtonModule,
    MatSnackBarModule,
    CustomLottieModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    KeyByLanguageModule,
    MatNativeDateModule,
    HoverDirectiveModule,
    DetailedGroupModule,
    SearchResultCardModule,
    HighlightInArrayModule,
    ReactiveComponentModule,
    LanguageDirectionModule,
    MatProgressSpinnerModule,
    TimeFramesSelectionModule,
    EffectsModule.forFeature([GroupEffects]),
    StoreModule.forFeature(groupsFeatureKey, groupsStateReducer),
    RouterModule.forChild([
      {
        path: "group",
        children: [
          {
            path: "create",
            component: UpsertGroupComponent,
          },
          {
            path: "edit",
            component: UpsertGroupComponent,
            canActivate: [UpdateGroupGuard],
          },
          {
            path: "view",
            component: ViewGroupComponent,
            canActivate: [ViewGroupGuard],
          },
          {
            path: "not-found",
            component: GroupNotFoundComponent,
          },
        ],
      },
    ]),
    GroupTimeFramesToShiftsModule,
    ShiftCardModule,
    FormControlTrimDirectiveModule,
  ],
})
export class GroupModule {}
