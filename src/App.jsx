import { Routes, Route } from 'react-router-dom'
import TaskpaneView from './components/views/taskpane/TaskpaneView.jsx'
import AdminView from './components/views/admin/AdminView.jsx'

// Eén Vite-app, twee modi:
//  - '/'      → het Drafter-paneel dat IN Word draait (taskpane). Manifest wijst hierheen.
//  - '/admin' → het beheer-dashboard, geopend in een gewone browser (system-messages + instellingen).
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskpaneView />} />
      <Route path="/admin/*" element={<AdminView />} />
      <Route path="*" element={<TaskpaneView />} />
    </Routes>
  )
}
