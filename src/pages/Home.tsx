import { Link } from 'react-router-dom'
import AuthButtons from '../components/AuthButtons'
import { useSession } from '../hooks/useSession'

export default function Home(){
  const session = useSession();
  return (
    <div className="container">
      <div className="card" style={{maxWidth: 720, margin: '10vh auto', textAlign:'center'}}>
        <h1>Manex</h1>
        <p>Crée, mets à jour et partage ton manuel d’exploitation en ligne.</p>
        {session ? (
          <div style={{marginTop:'1rem'}}>
            <Link className="link" to="/app">
              <button>Accéder à mon Dashboard</button>
            </Link>
          </div>
        ) : (
          <>
            <div style={{marginTop:'1rem'}}>
              <Link className="link" to="/signin">
                <button>Se connecter par e‑mail</button>
              </Link>
            </div>
            <div className="hr"></div>
            <p>Ou continue avec :</p>
            <div style={{display:'flex', justifyContent:'center'}}>
              <AuthButtons />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
