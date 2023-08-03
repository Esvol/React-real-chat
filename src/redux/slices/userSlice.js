import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  },
  chatId: "null",
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    chatReduser: (state, action) => {
      state.user = action.payload;
        state.chatId =
          state.currentUser.uid > action.payload.uid
            ? state.currentUser.uid + action.payload.uid
            : action.payload.uid + state.currentUser.uid;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, chatReduser } = userSlice.actions;

export default userSlice.reducer;
