import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { isNil } from "lodash";
import { map, Observable, skipWhile, switchMap } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
import {
  selectAllGroupsMap,
  selectGroupsInitialFetchStatus,
} from "../pages/group/reducer/group.reducer";
import { GroupQueriesService } from "../pages/group/services/group-queries.service";

@Injectable()
export class UpdateGroupGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly groupQueriesService: GroupQueriesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const groupAdminId = route.queryParamMap.get("id");

    return this.store.select(selectGroupsInitialFetchStatus).pipe(
      skipWhile((status) => status !== "DONE"),
      switchMap(() =>
        this.groupQueriesService.fetchGroupIdByAdminId(groupAdminId ?? "")
      ),
      withLatestFrom(this.store.select(selectAllGroupsMap)),
      map(([groupId, allGroupsMap]) => {
        if (isNil(groupId)) {
          return this.router.parseUrl("/group/not-found");
        }

        route.data = { group: allGroupsMap[groupId] };

        return true;
      })
    );
  }
}
