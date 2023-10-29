import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { isEmpty, isNil, range } from "lodash";
import * as moment from "moment";
import {
  CountedTimeFrame,
  Group,
  NewGroupData,
} from "../../../../../assets/models/group.model";
import { DateValidator } from "../../../../../assets/utils/date-validator";
import {
  createNewGroup,
  updateExistingGroup,
} from "../../actions/group.actions";

@Component({
  selector: "upsert-group",
  templateUrl: "./upsert-group.component.html",
  styleUrls: ["./upsert-group.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertGroupComponent {
  groupAdminId: string;
  mode: "INSERT" | "UPDATE";
  today = moment(moment(), "DD/MM/YYYY");

  title: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  expirationDate = new FormControl(
    this.today.add(1, "month").toDate(),
    DateValidator()
  );
  designations = new FormArray([]);
  email = new FormControl("", [Validators.required, Validators.email]);
  upsertGroupForm = new FormGroup({
    title: this.title,
    expirationDate: this.expirationDate,
    designations: this.designations,
    email: this.email,
  });
  groupToUpdate: Group;
  formValidAndSubmitted = false;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {
    this.upsertGroupForm = new FormGroup({
      title: this.title,
      expirationDate: this.expirationDate,
      designations: this.designations,
      email: this.email,
    });

    if (route.snapshot.routeConfig.path === "update") {
      this.mode = "UPDATE";
      this.groupToUpdate = route.snapshot.data["group"];

      this.initializeFormWithGroupData(this.groupToUpdate);
    } else {
      this.mode = "INSERT";
      this.addDesignation();
    }

    this.groupAdminId = this.route.snapshot.queryParamMap.get("id");
  }

  initializeFormWithGroupData(group: Group) {
    this.title.setValue(group.title);
    this.expirationDate.setValue(
      moment(moment(group.expirationDate), "DD/MM/YYYY").toDate()
    );
    this.email.setValue(group.email);

    if (isEmpty(group.designations)) {
      this.addDesignation();
    } else {
      group.designations.forEach((designation) =>
        this.addDesignation(designation)
      );
    }
  }

  addDesignation(designation = "") {
    this.designations.push(
      new FormControl(designation, Validators.maxLength(50))
    );
  }

  areSomeDesignationsNotFilled() {
    return this.designations.controls.some(
      (control) => control.value?.length === 0
    );
  }

  upsertGroup() {
    if (!this.upsertGroupForm.valid) {
      this.upsertGroupForm.markAllAsTouched();
    } else {
      this.formValidAndSubmitted = true;

      const upsertedGroupRawFormData: NewGroupData = this.upsertGroupForm.value;

      const upsertedGroup: NewGroupData = {
        ...upsertedGroupRawFormData,
        expirationDate: moment(
          upsertedGroupRawFormData.expirationDate
        ).toISOString(),
        designations: !upsertedGroupRawFormData.designations[0]
          ? []
          : upsertedGroupRawFormData.designations,
      };

      if (!isNil(this.groupToUpdate)) {
        this.store.dispatch(
          updateExistingGroup({
            updatedGroup: upsertedGroup,
            groupAdminId: this.groupAdminId,
            updatedGroupId: this.groupToUpdate.id,
          })
        );
      } else {
        upsertedGroup.selectedTimeFrames = range(0, 24).map<CountedTimeFrame>(
          (time) => ({
            startTime: time,
            endTime: time + 1,
            participantsNames: [],
            selectionCount: 0,
          })
        );

        this.store.dispatch(createNewGroup({ newGroup: upsertedGroup }));
      }
    }
  }
}
