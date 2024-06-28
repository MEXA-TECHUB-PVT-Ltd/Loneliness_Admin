// ** Redux Imports
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

import api from "./api";

const store = configureStore({
  reducer: { ...rootReducer, [api.reducerPath]: api.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export { store };
