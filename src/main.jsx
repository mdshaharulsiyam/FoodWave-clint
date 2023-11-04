import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Route from './Route/Route.jsx'
import Context from './Context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
      <Route></Route>
    </Context>
  </React.StrictMode>,
)
