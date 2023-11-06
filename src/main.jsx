import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Route from './Route/Route.jsx'
import Context from './Context/Context.jsx'
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Context>
        <Route></Route>
      </Context>
    </QueryClientProvider>
  </React.StrictMode>,
)
