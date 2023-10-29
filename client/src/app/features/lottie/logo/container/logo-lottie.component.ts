import { ChangeDetectionStrategy, Component, NgZone } from "@angular/core";
import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: "logo-lottie",
  templateUrl: "./logo-lottie.component.html",
  styleUrls: ["./logo-lottie.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoLottieComponent {
  animationItem: AnimationItem;
  animationConfig: AnimationOptions = {
    loop: true,
    autoplay: true,
    path: "/assets/lotties/logo-light.json",
  };

  constructor(private ngZone: NgZone) {}

  animationCreated($event: AnimationItem) {
    this.animationItem = $event;
    this.animationItem.setSpeed(0.7);
    setTimeout(() => this.animationItem.play(), 1500);
  }
}
