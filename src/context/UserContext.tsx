import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { supabase } from '../utils/supabase.ts'

interface User {
  id: string
  email?: string
  user_metadata: {
    full_name?: string
  }
}

interface IProps{
  user: User | null
  isAuthenticated: boolean
}

export const UserContext = createContext<IProps>({
  user: null,
  isAuthenticated: false
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

  return <UserContext.Provider value={{
    user,
    isAuthenticated
  }}>
    {children}
  </UserContext.Provider>
}
