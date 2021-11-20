import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DecodeUser, getCurrentUser } from "../services/authService";
import { AppThunk } from "./store";

export interface UserState {
  decodeUser: DecodeUser | null;
}

const initialState: UserState = { decodeUser: null };

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet: (user, action: PayloadAction<DecodeUser | null>) => {
      user.decodeUser = action.payload;
    },
  },
});

export default slice.reducer;

const { userSet } = slice.actions;

//action creators
export const setUser: AppThunk = (dispatch) => {
  const decodeUser = getCurrentUser();
  dispatch(userSet(decodeUser));
};
