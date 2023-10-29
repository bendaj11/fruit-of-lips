import { createAction, props } from "@ngrx/store";
import { Chapter } from "../../../../assets/models/chapter.model";

enum ChaptersActions {
  SAVE_CHAPTERS = "[Chapters] Save chapters",
}

export const saveChapters = createAction(
  ChaptersActions.SAVE_CHAPTERS,
  props<{ entitiesToSave: Chapter[] }>()
);
