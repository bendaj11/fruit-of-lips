import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: "standard-lottie",
  templateUrl: "./standard-lottie.component.html",
  styleUrls: ["./standard-lottie.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardLottieComponent {
  @Input() set src(src: string) {
    this.animationConfig = {
      ...this.animationConfig,
      path: src,
    };
  }

  animationItem: AnimationItem;
  animationConfig: AnimationOptions = {
    loop: true,
    autoplay: true,
  };

  animationCreated($event: AnimationItem) {
    this.animationItem = $event;
  }
}
