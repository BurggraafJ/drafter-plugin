import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Office.onReady resolvet ook buiten Word (host = null). We wachten erop zodat
// Word.run-aanroepen in de taskpane veilig zijn, maar blokkeren de /admin-route niet.
const root = ReactDOM.createRoot(document.getElementById('root'))

function render() {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
}

if (typeof Office !== 'undefined' && Office.onReady) {
  Office.onReady(() => render())
} else {
  render()
}
