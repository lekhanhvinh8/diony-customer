import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DecodeUser, getCurrentUser, getUserId } from "../services/authService";
import { AppThunk } from "./store";

export interface UserState {
  decodeUser: DecodeUser | null;
  userId: string | null;
}

const initialState: UserState = { decodeUser: null, userId: null };

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet: (
      user,
      action: PayloadAction<{
        decodeUser: DecodeUser | null;
        userId: string | null;
      }>
    ) => {
      user.decodeUser = action.payload.decodeUser;
      user.userId = action.payload.userId;
    },
  },
});

export default slice.reducer;

const { userSet } = slice.actions;

//action creators
export const setUser: AppThunk = (dispatch) => {
  const decodeUser = getCurrentUser();
  const userId = getUserId();
  dispatch(userSet({ decodeUser, userId }));
};
