import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LottieModule } from "ngx-lottie";
import { LogoLottieComponent } from "./logo/container/logo-lottie.component";
import { StandardLottieComponent } from "./standard-lottie/standard-lottie.component";

@NgModule({
  declarations: [LogoLottieComponent, StandardLottieComponent],
  imports: [CommonModule, LottieModule],
  exports: [LogoLottieComponent, StandardLottieComponent],
})
export class CustomLottieModule {}
