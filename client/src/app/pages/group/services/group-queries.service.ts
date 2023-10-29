import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Apollo, gql } from "apollo-angular";
import { isEmpty } from "lodash";
import { map } from "rxjs";
import { parse, stringify } from "zipson/lib";
import {
  CountedTimeFrame,
  Group,
  GroupResponse,
  NewGroupData,
  UpdatedGroupData,
} from "../../../../assets/models/group.model";
import { BaseEntity } from "../../../../assets/models/base-entity.model";

@Injectable()
export class GroupQueriesService {
  constructor(
    private readonly apollo: Apollo,
    private readonly translateService: TranslateService
  ) {}

  fetchGroupsByIds(ids: string[]) {
    return this.apollo
      .query<{ fetchGroupsByIds: GroupResponse[] }>({
        query: gql`
          query fetchGroupsByIds($ids: [uuid!]!) {
            fetchGroupsByIds: groups(where: { id: { _in: $ids } }) {
              id
              title
              email
              updatedAt
              designations
              expirationDate
              selectedTimeFrames
            }
          }
        `,
        variables: { ids },
      })
      .pipe(
        map(
          (result) =>
            result?.data?.fetchGroupsByIds?.map<Group>((group) => ({
              ...group,
              selectedTimeFrames: this.parseSelectedTimeFramesString(
                group.selectedTimeFrames
              ),
            })) ?? []
        )
      );
  }

  allGroupsLiveQuery() {
    return this.apollo
      .subscribe<{
        allGroupsLiveQuery: BaseEntity[];
      }>({
        query: gql`
          subscription allGroupsLiveQuery {
            allGroupsLiveQuery: groups {
              id
              updatedAt
            }
          }
        `,
      })
      .pipe(map((response) => response?.data?.allGroupsLiveQuery ?? []));
  }

  createNewGroup(newGroupData: NewGroupData) {
    return this.apollo
      .mutate<{
        createNewGroup: { id: string };
      }>({
        mutation: gql`
          mutation createNewGroup($newGroup: groups_insert_input!) {
            createNewGroup: insert_groups_one(object: $newGroup) {
              id
            }
          }
        `,
        variables: {
          newGroup: {
            ...newGroupData,
            language: this.translateService.currentLang,
            selectedTimeFrames: stringify(newGroupData.selectedTimeFrames),
          },
        },
      })
      .pipe(map((response) => response.data?.createNewGroup.id));
  }

  updateSelectedTimeFrames(
    groupId: string,
    selectedTimeFrames: CountedTimeFrame[]
  ) {
    return this.apollo
      .mutate<{ updateSelectedTimeFrames: { id: string } }>({
        mutation: gql`
          mutation updateSelectedTimeFrames(
            $selectedTimeFrames: String!
            $groupId: uuid!
          ) {
            updateSelectedTimeFrames: update_groups_by_pk(
              pk_columns: { id: $groupId }
              _set: { selectedTimeFrames: $selectedTimeFrames }
            ) {
              id
            }
          }
        `,
        variables: {
          groupId: groupId,
          selectedTimeFrames: stringify(selectedTimeFrames),
        },
      })
      .pipe(map((response) => response.data?.updateSelectedTimeFrames.id));
  }

  updateExistingGroup(
    groupId: string,
    groupAdminId: string,
    updatedGroup: UpdatedGroupData
  ) {
    return this.apollo
      .mutate<{ updateExistingGroup: { id: string } }>({
        mutation: gql`
          mutation updateExistingGroup(
            $groupId: uuid!
            $updatedGroup: groups_set_input
          ) {
            updateExistingGroup: update_groups_by_pk(
              _set: $updatedGroup
              pk_columns: { id: $groupId }
            ) {
              id
            }
          }
        `,
        variables: {
          groupId,
          updatedGroup,
        },
        context: {
          headers: { "X-Hasura-Group-Admin-Id": groupAdminId },
        },
      })
      .pipe(map((response) => response.data?.updateExistingGroup.id));
  }

  fetchGroupIdByAdminId(adminId: string) {
    return this.apollo
      .query<{ fetchGroupIdByAdminId: { id: string }[] }>({
        query: gql`
          query fetchGroupIdByAdminId {
            fetchGroupIdByAdminId: groups {
              id
            }
          }
        `,
        context: {
          headers: { "X-Hasura-Group-Admin-Id": adminId },
        },
      })
      .pipe(
        map((response) => {
          if (isEmpty(response.data) || response.errors?.length > 0) {
            return null;
          }

          return response.data.fetchGroupIdByAdminId[0]?.id;
        })
      );
  }

  private parseSelectedTimeFramesString(
    compressedTimeFramesString: string
  ): CountedTimeFrame[] {
    return parse(compressedTimeFramesString);
  }
}
