import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/user/userSlice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
