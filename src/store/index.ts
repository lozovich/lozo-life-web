import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import createSaga from 'redux-saga';
import Reducers from './reducers';
import RootSaga from './sagas';

const saga = createSaga();

const store = configureStore({
  reducer: Reducers,
  middleware: [saga]
});

saga.run(RootSaga);

export type StoreType = ReturnType<typeof store.getState>;
export default store;
