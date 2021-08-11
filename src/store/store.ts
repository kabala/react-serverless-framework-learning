import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
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
