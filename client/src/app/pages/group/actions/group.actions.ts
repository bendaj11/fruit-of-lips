import { createAction, props } from "@ngrx/store";
import {
  CountedTimeFrame,
  Group,
  NewGroupData,
  UpdatedGroupData,
} from "../../../../assets/models/group.model";

enum GroupsActions {
  SAVE_GROUPS = "[ Group ] Save groups",
  REMOVE_GROUPS = "[ Group ] Remove groups",
  CREATE_NEW_GROUP = "[ Group ] Create new group",
  UPDATE_EXISTING_GROUP = "[ Group ] Update existing group",
  UPDATE_SELECTED_TIME_FRAMES = "[ Group ] Update selected time frames",
  FINISHED_INITIAL_GROUPS_FETCH = "[ Group ] Finished initial groups fetch",
}

export const saveGroups = createAction(
  GroupsActions.SAVE_GROUPS,
  props<{ entitiesToSave: Group[] }>()
);

export const removeGroups = createAction(
  GroupsActions.REMOVE_GROUPS,
  props<{ idsToRemove: string[] }>()
);

export const createNewGroup = createAction(
  GroupsActions.CREATE_NEW_GROUP,
  props<{ newGroup: NewGroupData }>()
);

export const updateSelectedTimeFrames = createAction(
  GroupsActions.UPDATE_SELECTED_TIME_FRAMES,
  props<{
    groupId: string;
    selectedTimeFrames: CountedTimeFrame[];
  }>()
);

export const updateExistingGroup = createAction(
  GroupsActions.UPDATE_EXISTING_GROUP,
  props<{
    groupAdminId: string;
    updatedGroupId: string;
    updatedGroup: UpdatedGroupData;
  }>()
);

export const finishedInitialGroupsFetch = createAction(
  GroupsActions.FINISHED_INITIAL_GROUPS_FETCH
);
