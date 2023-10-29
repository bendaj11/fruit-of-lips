import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, map } from "rxjs";
import {
  selectAllGroups,
  selectGroupsInitialFetchStatus,
  selectGroupsSortedByExpirationDate,
} from "../../group/reducer/group.reducer";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @ViewChild("searchInput", { static: false }) searchInput: ElementRef;

  groupsData$ = combineLatest([
    this.store.select(selectGroupsSortedByExpirationDate),
    this.store.select(selectGroupsInitialFetchStatus),
  ]).pipe(
    map(([groups, groupsInitialFetchStatus]) => ({
      groups,
      groupsInitialFetchStatus,
    }))
  );

  allGroups$ = this.store.select(selectAllGroups);
  groupsInitialFetchStatus$ = this.store.select(selectGroupsInitialFetchStatus);

  constructor(private readonly store: Store) {}
}
