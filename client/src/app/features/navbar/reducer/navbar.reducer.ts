import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from "@ngrx/store";
import { changeNavbarTransparency } from "../actions/navbar.actions";

export const navbarFeatureKey = "navbar";

export interface NavbarState {
  isTransparent: boolean;
}

export const initialState: NavbarState = {
  isTransparent: false,
};

export const reducer = createReducer(
  initialState,
  on(changeNavbarTransparency, (state, { isTransparent }) => ({
    ...state,
    isTransparent,
  }))
);

export const navbarReducer = (state: NavbarState, action: Action) =>
  reducer(state, action);

export const getNavbarFeatureKey =
  createFeatureSelector<NavbarState>(navbarFeatureKey);

export const selectIsSilent = createSelector(
  getNavbarFeatureKey,
  (state: NavbarState) => state.isTransparent
);
