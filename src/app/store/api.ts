import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<any>("api/callBegan");
export const apiCallFailed = createAction<any>("api/callFailed");
export const apiCallSuccess = createAction<any>("api/callSuccess");
