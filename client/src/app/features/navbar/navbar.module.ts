import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveComponentModule } from "@ngrx/component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageDirectionModule } from "../../directives/language-direction/language-direction.module";
import { LanguageSelectorModule } from "../language-selector/language-selector.module";
import { CustomLottieModule } from "../lottie/custom-lottie.module";
import { NavbarComponent } from "./container/navbar.component";
import { NavbarEffects } from "./effects/navbar.effects";
import { navbarFeatureKey, navbarReducer } from "./reducer/navbar.reducer";

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    LanguageSelectorModule,
    ReactiveComponentModule,
    LanguageDirectionModule,
    EffectsModule.forFeature([NavbarEffects]),
    StoreModule.forFeature(navbarFeatureKey, navbarReducer),
    CustomLottieModule,
  ],
  providers: [Title],
})
export class NavbarModule {}
