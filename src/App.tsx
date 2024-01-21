import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes.tsx'

function App() {
  return (
    <ChakraProvider toastOptions={{
      defaultOptions: {
        duration: 4000,
        position: 'top'
      }
    }}>
        <AppRouter />
    </ChakraProvider>
  )
}

export default App
