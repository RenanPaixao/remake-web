import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes.tsx'
import { useEffect } from 'react'
import { supabase } from './utils/supabase.ts'
import { useDispatch } from 'react-redux'
import { clearUser, setUser } from './store/reducers/user/userSlice.ts'

function App() {
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session?.user){
        dispatch(setUser(session.user))
        return
      }
      
      dispatch(clearUser())
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
      
      data.session?.user ?
        dispatch(setUser(data.session?.user)) :
        dispatch(clearUser())
    }
    
    setUserBySession()
  })
  
  return (
    <ChakraProvider toastOptions={{
      defaultOptions: {
        position: 'top'
      }
    }}>
        <AppRouter />
    </ChakraProvider>
  )
}

export default App
