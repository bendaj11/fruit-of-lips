import { createAction, props } from "@ngrx/store";

export enum NavbarActions {
  CHANGE_TRANSPARENCY = "[Navbar] Change navbar transparency",
}

export const changeNavbarTransparency = createAction(
  NavbarActions.CHANGE_TRANSPARENCY,
  props<{ isTransparent: boolean }>()
);
