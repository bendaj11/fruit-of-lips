import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "group-not-found",
  templateUrl: "./group-not-found.component.html",
  styleUrls: ["./group-not-found.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
