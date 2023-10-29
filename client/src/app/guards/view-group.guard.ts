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
import { map, Observable, skipWhile } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
import {
  selectAllGroupsMap,
  selectGroupsInitialFetchStatus,
} from "../pages/group/reducer/group.reducer";

@Injectable()
export class ViewGroupGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const groupId = route.queryParamMap.get("id");

    if (!groupId) {
      return this.router.parseUrl("/group/not-found");
    }

    return this.store.select(selectGroupsInitialFetchStatus).pipe(
      skipWhile((status) => status !== "DONE"),
      withLatestFrom(this.store.select(selectAllGroupsMap)),
      map(([_, allGroupsMap]) => {
        if (isNil(allGroupsMap[groupId])) {
          return this.router.parseUrl("/group/not-found");
        }

        return true;
      })
    );
  }
}
