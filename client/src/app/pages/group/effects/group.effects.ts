import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { isNil } from "lodash";
import { combineLatest, first, map, skipWhile, switchMap } from "rxjs";
import { ID } from "../../../../assets/models/base-entity.model";
import { Group } from "../../../../assets/models/group.model";
import { pollEntity } from "../../../../assets/utils/poll-entity";
import {
  createNewGroup,
  finishedInitialGroupsFetch,
  removeGroups,
  saveGroups,
  updateExistingGroup,
  updateSelectedTimeFrames,
} from "../actions/group.actions";
import {
  selectAllGroupsForSearchIdAndUpdatedAt,
  selectAllGroupsMap,
} from "../reducer/group.reducer";
import { GroupQueriesService } from "../services/group-queries.service";

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService,
    private readonly groupQueriesService: GroupQueriesService
  ) {}

  fetchGroups = createEffect(
    () =>
      pollEntity<Group, ID>({
        debug: false,
        discriminator: "rle",
        entityName: "GroupForSearch",
        livequery: () => this.groupQueriesService.allGroupsLiveQuery(),
        byIds: (ids) => this.groupQueriesService.fetchGroupsByIds(ids),
        remove: (idsToRemove: string[]) =>
          this.store.dispatch(removeGroups({ idsToRemove })),
        upsert: (entitiesToSave) =>
          this.store.dispatch(saveGroups({ entitiesToSave })),
        myStore: () =>
          this.store.select(selectAllGroupsForSearchIdAndUpdatedAt),
      }),
    { dispatch: false }
  );

  finishedInitialGroupsFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveGroups),
      first(),
      map(() => finishedInitialGroupsFetch())
    )
  );

  createNewGroup$ = createEffect(
    () =>
      combineLatest([
        this.actions$.pipe(
          ofType(createNewGroup),
          switchMap(({ newGroup }) =>
            this.groupQueriesService.createNewGroup(newGroup)
          )
        ),
        this.store.select(selectAllGroupsMap),
      ]).pipe(
        skipWhile(([newGroupId, allGroups]) => isNil(allGroups[newGroupId])),
        map(([newGroupId]) =>
          this.router.navigate(["/group/view"], {
            queryParams: { id: newGroupId },
          })
        )
      ),
    { dispatch: false }
  );

  updateSelectedTimeFrames$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateSelectedTimeFrames),
        switchMap(({ groupId, selectedTimeFrames }) =>
          combineLatest([
            this.groupQueriesService.updateSelectedTimeFrames(
              groupId,
              selectedTimeFrames
            ),
            this.translateService.get("group.view.select.success.title"),
          ])
        ),
        map(([updatedGroupId, successMessage]) => {
          this.router.navigate(["/group/view"], {
            queryParams: { id: updatedGroupId },
          });

          this.snackBar.open(successMessage, "", {
            panelClass: "selected-time-frames-update-success",
            direction:
              this.translateService.currentLang === "he" ? "rtl" : "ltr",
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  updateExistingGroup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateExistingGroup),
        switchMap(({ updatedGroup, groupAdminId, updatedGroupId }) =>
          this.groupQueriesService.updateExistingGroup(
            updatedGroupId,
            groupAdminId,
            updatedGroup
          )
        ),
        map((updatedGroupId) =>
          this.router.navigate(["/group/view"], {
            queryParams: { id: updatedGroupId },
          })
        )
      ),
    { dispatch: false }
  );
}
