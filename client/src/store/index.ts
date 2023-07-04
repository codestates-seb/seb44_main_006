import { configureStore } from '@reduxjs/toolkit';

import { mapReducer } from './map-slice';
import { markerReducer } from './marker-slice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    marker: markerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
