import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "feature-preview-card",
  templateUrl: "./feature-preview-card.component.html",
  styleUrls: ["./feature-preview-card.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturePreviewCardComponent {}
