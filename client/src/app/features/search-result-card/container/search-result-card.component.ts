import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DetailedGroup } from "../../../../assets/models/group.model";

@Component({
  selector: "search-result-card",
  templateUrl: "./search-result-card.component.html",
  styleUrls: ["./search-result-card.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultCardComponent {
  @Input() searchValue: string;
  @Input() detailedGroup: DetailedGroup;
}
