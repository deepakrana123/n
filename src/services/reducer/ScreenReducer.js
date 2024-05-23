import { finalSpaceCharacters } from "@/constants/constants";
import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
  name: "screen",
  initialState: {
    data: {},
    screens: finalSpaceCharacters,
    prevScreens: finalSpaceCharacters,
  },
  reducers: {
    addScreen: (state, action) => {
      console.log(action.payload, "hiii");
      if (state.data[action.payload[1]]) {
        state.data[action.payload[1]].push(action.payload[0]);
      } else {
        state.data[action.payload[1]] = [action.payload[0]];
      }
    },
    saveScreen: (state, action) => {
      state.prevScreens = state.screens;
      state.screens = action.payload;
    },
    editScreenDeatils: (state, action) => {
      state.data[action.payload[1]] = action.payload[0][action.payload[1]];
    },
  },
});
export const { addScreen, saveScreen, editScreenDeatils } = screenSlice.actions;

export default screenSlice.reducer;
