import { createSlice } from '@reduxjs/toolkit'
import { IUserSliceState } from './types.ts'

const initialState: IUserSliceState  = {
  isAuthenticated: false,
  userInformation: {
    id: null,
    fullName: '',
    email: '',
    isRecycler: false
  }
}

export const createUserSlice = (initialState: IUserSliceState) => {
  return createSlice({
    name: 'user',
    initialState,
    reducers: {
      clearUser(state) {
        state.isAuthenticated = false
        state.userInformation = {
          id: null,
          fullName: '',
          email: '',
          isRecycler: false
        }
      },
      setUser(state, action) {
        state.isAuthenticated = true

        state.userInformation = {
          id: action.payload.id,
          fullName: action.payload.user_metadata.first_name + ' ' + action.payload.user_metadata.last_name,
          email: action.payload.email,
          isRecycler: action.payload.user_metadata.is_recycler
        }
      }
    }
  })
}

const userSlice = createUserSlice(initialState)

export const { clearUser, setUser } = userSlice.actions

export const { reducer : userReducer } = userSlice
