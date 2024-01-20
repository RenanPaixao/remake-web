import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import AppRouter from './routes.tsx'

function App() {
  return (
    <ChakraProvider>
        <AppRouter />
    </ChakraProvider>
  )
}

export default App
