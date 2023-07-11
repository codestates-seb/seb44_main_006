import { configureStore } from '@reduxjs/toolkit';

import { mapReducer } from './map-slice';
import { markerReducer } from './marker-slice';
import { placeListReducer } from './placeList-slice';
import { scheduleListReducer } from './scheduleList-slice';
import { overlayReducer } from './overlay-slice';
import { setUserOAuthReducer } from './userAuth-slice';
import { selectedIdReducer } from './selectedId-slice';
import { showDetailReducer } from './showDetail-slice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    marker: markerReducer,
    placeList: placeListReducer,
    scheduleList: scheduleListReducer,
    overlay: overlayReducer,
    userAuth: setUserOAuthReducer,
    selectedId: selectedIdReducer,
    showDetail: showDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
