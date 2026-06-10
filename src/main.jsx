import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Office.onReady resolvet ook buiten Word (host = null). We wachten erop zodat
// Word.run-aanroepen in de taskpane veilig zijn, maar blokkeren de /admin-route niet.
const root = ReactDOM.createRoot(document.getElementById('root'))

let rendered = false
function render() {
  if (rendered) return
  rendered = true
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
  // Vangnet: blijft onReady om wat voor reden dan ook uit, render dan tóch — een paneel met
  // UI waarvan de Office-features even later bijtrekken (useOfficeReady wacht zelf óók op
  // onReady) is altijd beter dan een leeg paneel.
  setTimeout(render, 2000)
} else {
  render()
}
