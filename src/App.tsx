import './App.css'
import { ActiveGameContextProvider } from './lib/useActiveGame'
import { Router } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ActiveGameContextProvider>
        <Router />
      </ActiveGameContextProvider>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
