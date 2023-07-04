import { configureStore } from '@reduxjs/toolkit';

import { mapReducer } from './map-slice';

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export default store;
