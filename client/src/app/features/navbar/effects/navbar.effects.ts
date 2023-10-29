import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction, routerRequestAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import {
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  switchMap,
  tap,
} from "rxjs";
import { changeNavbarTransparency } from "../actions/navbar.actions";

const SILENT_ROUTES = ["home", ""];

@Injectable()
export class NavbarEffects {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly titleService: Title,
    private readonly translateService: TranslateService
  ) {}

  setNavbarStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerRequestAction),
      map(({ payload }) => {
        const shouldNavbarBeTransparent = SILENT_ROUTES.some(
          (silentRoute) => payload.event.url === `/${silentRoute}`
        );

        return changeNavbarTransparency({
          isTransparent: shouldNavbarBeTransparent,
        });
      })
    )
  );

  checkScrollPosition$ = createEffect(() =>
    fromEvent(window, "scroll").pipe(
      debounceTime(10),
      map(() => {
        if (document.documentElement.scrollTop > 450) {
          return changeNavbarTransparency({ isTransparent: false });
        }

        const shouldNavbarBeSilent = SILENT_ROUTES.some(
          (silentRoute) => this.router.url === `/${silentRoute}`
        );

        return changeNavbarTransparency({
          isTransparent: shouldNavbarBeSilent,
        });
      })
    )
  );

  setTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        switchMap(({ payload }) => {
          const currentNavigation = this.router
            .parseUrl(payload.event.url)
            .root.children["primary"].segments.map((it) => it.path)
            .join(".");

          return combineLatest([
            this.translateService.get(currentNavigation),
            this.translateService.get("system.name"),
          ]);
        }),
        tap(([currentRoute, systemName]) =>
          this.titleService.setTitle(`${systemName} | ${currentRoute.title}`)
        )
      ),
    { dispatch: false }
  );
}
