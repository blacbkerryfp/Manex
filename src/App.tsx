import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useSession } from './hooks/useSession';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ManexEditor from './pages/ManexEditor';

function Home() {
  const session = useSession();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: '#fff',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Bienvenue sur <span style={{ color: '#a78bfa' }}>Manex</span></h1>
      <p style={{ maxWidth: '400px', opacity: 0.8, marginBottom: '2rem' }}>
        Gérez facilement votre manuel d’exploitation en ligne et accédez à votre espace sécurisé.
      </p>
      {session ? (
        <Link to="/app" style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#a78bfa',
            color: '#fff',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Accéder à mon Dashboard
          </button>
        </Link>
      ) : (
        <Link to="/signin" style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#a78bfa',
            color: '#fff',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Se connecter
          </button>
        </Link>
      )}
    </div>
  );
}

function Private({ children }: { children: JSX.Element }) {
  const session = useSession();
  const location = useLocation();

  if (session === undefined) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0f172a',
        color: '#fff'
      }}>
        Chargement...
      </div>
    );
  }

  return session ? children : <Navigate to="/signin" state={{ from: location }} replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/app" element={<Private><Dashboard /></Private>} />
        <Route path="/app/m/:id" element={<Private><ManexEditor /></Private>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
