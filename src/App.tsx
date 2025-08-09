import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { useSession } from './hooks/useSession'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import ManexEditor from './pages/ManexEditor'
import { useEffect } from 'react'

/** Petite Home simple avec boutons */
function Home() {
  const session = useSession()
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 720, margin: '10vh auto', textAlign: 'center' }}>
        <h1>Manex</h1>
        <p>Crée, mets à jour et partage ton manuel d’exploitation en ligne.</p>
        {session ? (
          <Link to="/app"><button>Accéder à mon Dashboard</button></Link>
        ) : (
          <>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/signin"><button>Se connecter par e‑mail</button></Link>
            </div>
            <div className="hr"></div>
            <p>Ou continue avec Google/Apple depuis la page de connexion.</p>
          </>
        )}
      </div>
    </div>
  )
}

/** Garde d’auth : protège /app et l’éditeur */
function Private({ children }: { children: JSX.Element }) {
  const s = useSession()
  const loc = useLocation()
  if (s === undefined) return <div className="container">Chargement…</div>
  return s ? children : <Navigate to="/signin" state={{ from: loc }} replace />
}

/** Redirection douce : si on atterrit authentifié sur /signin, va sur /app */
function SignInGuard() {
  const s = useSession()
  useEffect(() => {
    // Si déjà connecté, envoie vers /app
    if (s) window.location.replace('/app')
  }, [s])
  return <SignIn />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignInGuard />} />
      <Route path="/app" element={<Private><Dashboard /></Private>} />
      <Route path="/app/m/:id" element={<Private><ManexEditor /></Private>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
