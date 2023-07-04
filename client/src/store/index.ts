import { configureStore } from '@reduxjs/toolkit';

import { mapReducer } from './map-slice';

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
