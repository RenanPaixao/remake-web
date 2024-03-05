import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/user/userSlice.ts'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const persistConfig = {
  key: 'user',
  storage: storage,
  blacklist: ['userInformation']
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
})
const persistor = persistStore(store)

export { store, persistor }

// Remove the _persist property from the state type
type RemovePersistKeys<T> = T extends object
  ? {
    [K in keyof T as string extends K
      ? never
      : K extends '_persist'
        ? never
        : K]: RemovePersistKeys<T[K]>;
  }
  : T;

export type RootState = RemovePersistKeys<ReturnType<typeof store.getState>>
