export interface IUserSliceState{
  isAuthenticated: boolean
  userInformation: UserInformation
}

export interface UserInformation {
  id: string | null
  fullName: string
  email: string
  isRecycler: boolean
}

export interface User {
  id: string
  email?: string
  user_metadata: {
    first_name?: string
    last_name?: string
    is_recycler?: boolean
  }
}
