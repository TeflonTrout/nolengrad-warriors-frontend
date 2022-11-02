import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mainReducer from '../redux/mainSlice';

export const store = configureStore({
  reducer: {
    mainSlice: mainReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
