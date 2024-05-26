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
      if (state.data[action.payload[0]]) delete state.data[action.payload[0]]
      state.data[action.payload[0]] = [action.payload[1]];
      
    },
    saveScreen: (state, action) => {
      state.prevScreens = state.screens;
      state.screens = action.payload;
    },
    editScreenDeatils: (state, action) => {
      console.log(action.payload, "hiii");
      state.data[action.payload[0]] = [action.payload[1]];
    },
  },
});
export const { addScreen, saveScreen, editScreenDeatils } = screenSlice.actions;

export default screenSlice.reducer;
