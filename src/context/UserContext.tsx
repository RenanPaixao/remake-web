import { createContext, PropsWithChildren, useEffect, useState } from 'react'
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
  setUser: (user: User) => void
  isAuthenticated: () => boolean
}

export const UserContext = createContext<IProps>({
  user: null,
  setUser: () => {},
  isAuthenticated: () => false
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
  function isAuthenticated() {
    return user !== null
  }

  return <UserContext.Provider value={{
    user,
    setUser,
    isAuthenticated
  }}>
    {children}
  </UserContext.Provider>
}
