import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state, action) {
      let index;
      for (let i = 0; i < state.length; i++) {
        let { id: notificationId } = state[i] || {};
        if (action.payload === notificationId) {
          index = i;
        }
      }
      state.splice(index, 1);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
