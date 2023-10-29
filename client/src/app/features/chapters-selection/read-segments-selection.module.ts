import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { ReactiveComponentModule } from "@ngrx/component";
import { TranslateModule } from "@ngx-translate/core";
import { HoverDirectiveModule } from "../../directives/hover/hover-directive.module";
import { StyleByLanguageDirectiveModule } from "../../directives/style-by-language/style-by-language.module";
import { AvailableTimeFramesModule } from "../../pipes/available-time-frames/available-time-frames.module";
import { KeyByLanguageModule } from "../../pipes/key-by-language/key-by-language.module";
import { CustomLottieModule } from "../lottie/custom-lottie.module";
import { TimeFramesSelectionComponent } from "./container/time-frames-selection.component";

@NgModule({
  declarations: [TimeFramesSelectionComponent],
  exports: [TimeFramesSelectionComponent],
  imports: [
    CommonModule,
    FlexModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    CustomLottieModule,
    KeyByLanguageModule,
    HoverDirectiveModule,
    ReactiveComponentModule,
    MatProgressSpinnerModule,
    AvailableTimeFramesModule,
    StyleByLanguageDirectiveModule,
  ],
})
export class ReadSegmentsSelectionModule {}
