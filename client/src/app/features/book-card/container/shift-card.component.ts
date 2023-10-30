import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { MatRipple } from "@angular/material/core";
import { Store } from "@ngrx/store";
import * as confetti from "canvas-confetti";
import { isNil } from "lodash";
import { Shift, NamedTimeFrame } from "../../../../assets/models/group.model";

@Component({
  selector: "shift-card",
  templateUrl: "./shift-card.component.html",
  styleUrls: ["./shift-card.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShiftCardComponent {
  @Input() title: string;

  @Input() set shift(shift: Shift) {
    const isShiftAvailable = shift.some((timeFrame: NamedTimeFrame) =>
      isNil(timeFrame.participant)
    );

    if (this.isShiftAvailable && !isShiftAvailable) {
      this.activateConfetti();
    }

    this._shift = shift;
    this.isShiftAvailable = isShiftAvailable;
  }

  @ViewChild(MatRipple) matRipple: MatRipple;
  @ViewChild("confettiCanvas", { static: true })
  confettiCanvas: ElementRef<HTMLCanvasElement>;

  isNil = isNil;
  _shift: Shift;
  isShiftAvailable: boolean;

  private activateConfetti() {
    const cardConfetti = confetti.create(this.confettiCanvas.nativeElement, {
      useWorker: true,
    });

    cardConfetti({
      particleCount: 200,
      spread: 50,
      angle: 275,
      origin: { y: -5, x: 0.5 },
      colors: ["#793FDF", "#A8A8FF"],
    });
  }
}
