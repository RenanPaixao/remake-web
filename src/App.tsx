import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes.tsx'
import { UserProvider } from './context/UserContext.tsx'

function App() {
  return (
    <ChakraProvider toastOptions={{
      defaultOptions: {
        duration: 4000,
        position: 'top'
      }
    }}>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </ChakraProvider>
  )
}

export default App
