import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
import {
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';

import authReducer from './slices/authSlice';
import globalSlice from './slices/globalSlice';

const persistedReducer = persistCombineReducers(
  {
    key: 'auth',
    storage,
    whitelist: ['auth'],
    debug: true,
  },
  { global: globalSlice, auth: authReducer }
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      /* ignore persistance actions */
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
