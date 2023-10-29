import { DictionaryNum } from "@ngrx/entity/src/models";
import { BaseEntity } from "./base-entity.model";
import { DivisionType } from "./division-types.model";

export type GroupResponse = Group & {
  selectedTimeFrames: string;
};

export interface Group extends NewGroupData, BaseEntity {
  adminId: string;
  selectedTimeFrames: CountedTimeFrame[];
}

export interface NewGroupData {
  title: string;
  email: string;
  language: "he" | "en";
  expirationDate: string;
  designations: string[];
  selectedTimeFrames?: CountedTimeFrame[];
}

export type UpdatedGroupData = Omit<NewGroupData, "selectedTimeFrames">;

export interface DetailedGroup {
  group: Group;
  totalParticipantsCount: number;
  totalSelectedHours: number;
}

export interface TimeFrame {
  title?: string;
  startTime: number;
  endTime: number;
}

export interface CountedTimeFrame extends TimeFrame {
  selectionCount: number;
  participantsNames: string[];
}

export interface NamedTimeFrame extends TimeFrame {
  participant: string | "ANONYMOUS" | null;
}

export type Shift = NamedTimeFrame[];
