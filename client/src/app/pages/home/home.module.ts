import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { AosDirectiveModule } from "../../directives/aos/aos-directive.module";
import { LanguageDirectionModule } from "../../directives/language-direction/language-direction.module";
import { FeaturePreviewCardModule } from "../../features/feature-preview-card/feature-preview-card.module";
import { CustomLottieModule } from "../../features/lottie/custom-lottie.module";
import { HomeComponent } from "./container/home.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FlexModule,
    MatCardModule,
    TranslateModule,
    AosDirectiveModule,
    CustomLottieModule,
    LanguageDirectionModule,
    FeaturePreviewCardModule,
    RouterModule.forChild([{ path: "home", component: HomeComponent }]),
  ],
})
export class HomeModule {}
