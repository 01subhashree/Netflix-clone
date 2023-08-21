import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlicer";
import videoReducer from "./videoSlicer";

const store = configureStore({
  reducer: {
    user: userReducer,
    netflix: videoReducer,
  },
});

export default store;
