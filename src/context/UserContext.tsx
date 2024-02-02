import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { supabase } from '../utils/supabase.ts'

interface IProps{
  isAuthenticated: boolean
  userInformation: UserInformation
}

interface UserInformation {
  id: string | null
  fullName: string
  email: string
  isRecycler: boolean
}

interface User {
  id: string
  email?: string
  user_metadata: {
    first_name?: string
    last_name?: string
    is_recycler?: boolean
  }
}

export const UserContext = createContext<IProps>({
  isAuthenticated: false,
  userInformation: {
    id: null,
    fullName: '',
    email: '',
    isRecycler: false
  }
})

UserContext.displayName = 'UserContext'

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        return
      }

      setUser(null)
    })

    /**
     * Sets the user by the session.
     */
    async function setUserBySession(): Promise<void> {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error(error)
        return
      }

      setUser(data.session?.user ?? null)
      return
    }

    setUserBySession()
  }, [])

  /**
   * Returns whether the user is authenticated.
   */
  const isAuthenticated = useMemo(() => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID
    const localStorageKey = `sb-${projectId}-auth-token`

    return user !== null || localStorage.getItem(localStorageKey) !== null
  }, [user])

  /**
   * Returns the full name of the user.
   */
  const userInformation = useMemo(() => {
    if (!user) {
      return {
        id: '',
        fullName: '',
        email: '',
        isRecycler: false
      }
    }

    const { first_name, last_name } = user.user_metadata
    return {
      id: user.id,
      fullName: `${first_name} ${last_name}`,
      email: user.email ?? '',
      isRecycler: user.user_metadata.is_recycler ?? false
    }
  }, [user])

  return <UserContext.Provider value={{
    userInformation,
    isAuthenticated
  }}>
    {children}
  </UserContext.Provider>
}
