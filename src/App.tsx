import { Routes, Route, Navigate } from 'react-router-dom'
import { useSession } from './hooks/useSession'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import ManexEditor from './pages/ManexEditor'

function Private({ children }:{ children: JSX.Element }){
  const s = useSession()
  if (s === undefined) return <div className="container">Chargement…</div>
  return s ? children : <Navigate to="/signin" replace />
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/app" element={<Private><Dashboard/></Private>} />
      <Route path="/app/m/:id" element={<Private><ManexEditor/></Private>} />
    </Routes>
  )
}
