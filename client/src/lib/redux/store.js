import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import logger from 'redux-logger'
import cardSlice from './slices/cardSlice'
import productSlice from './slices/productSlice'
import userSlice from './slices/userSlice'

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducers =combineReducers({
  counter: counterSlice,
  card: cardSlice,
  product: productSlice,
  user:userSlice
})
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer:persistedReducer,
  middleware:()=> [logger]
})

export const persistor = persistStore(store);
