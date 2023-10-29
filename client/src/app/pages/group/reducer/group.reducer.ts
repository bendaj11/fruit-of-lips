import { createEntityAdapter, EntityState } from "@ngrx/entity";
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from "@ngrx/store";
import { partition, union } from "lodash";
import moment from "moment";
import { Group } from "../../../../assets/models/group.model";
import { ServerRequestStatus } from "../../../../assets/models/request-status.model";
import { sortedUniqByIdAndUpdatedAt } from "../../../../assets/utils/poll-entity";
import {
  finishedInitialGroupsFetch,
  removeGroups,
  saveGroups,
} from "../actions/group.actions";

export const groupsFeatureKey = "groups-reducer";

export interface GroupsState extends EntityState<Group> {
  initialFetchStatus: ServerRequestStatus;
}

export const groupsStateAdapter = createEntityAdapter<Group>();

export const initialState = groupsStateAdapter.getInitialState<GroupsState>({
  ids: [],
  entities: {},
  initialFetchStatus: "PENDING",
});

export const groupsStateReducer = createReducer(
  initialState,
  on(saveGroups, (state, { entitiesToSave }) =>
    groupsStateAdapter.upsertMany(entitiesToSave, state)
  ),
  on(removeGroups, (state, { idsToRemove }) =>
    groupsStateAdapter.removeMany(idsToRemove, state)
  ),
  on(finishedInitialGroupsFetch, (state) => ({
    ...state,
    initialFetchStatus: "DONE",
  }))
);

export const selectGroupsState =
  createFeatureSelector<GroupsState>(groupsFeatureKey);

export const {
  selectAll: selectAllGroups,
  selectEntities: selectAllGroupsMap,
} = groupsStateAdapter.getSelectors(selectGroupsState);

export const selectAllGroupsForSearchIdAndUpdatedAt = createSelector(
  selectAllGroups,
  (state) => sortedUniqByIdAndUpdatedAt(state)
);

export const selectGroupsSortedByExpirationDate = createSelector(
  selectAllGroups,
  (state) => {
    const partitionedGroups = partition(
      state,
      (group) => !moment(moment()).isAfter(moment(group.expirationDate))
    );

    return union(partitionedGroups[0], partitionedGroups[1]);
  }
);
export const selectGroupById = (id: string) =>
  createSelector(selectAllGroupsMap, (state) => state[id]);

export const selectGroupsInitialFetchStatus = createSelector(
  selectGroupsState,
  (state) => state.initialFetchStatus
);
