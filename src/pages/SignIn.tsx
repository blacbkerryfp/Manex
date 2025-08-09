import { useState } from 'react'
import AuthButtons from '../components/AuthButtons'
import { supabase } from '../lib/supabase'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'

// en haut du composant
const navigate = useNavigate();
const session = useSession();

// dès qu'on a une session, on envoie vers /app
useEffect(()=>{
  if (session) navigate('/app', { replace: true });
}, [session, navigate]);

export default function SignIn(){
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendOtp = async ()=>{
  setLoading(true);
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // ➜ Après clic dans l'email, on revient directement sur /app
      emailRedirectTo: `${window.location.origin}/app`,
    },
  });
  setLoading(false);
  if (error) { alert(error.message); return; }
  setSent(true);
};

  return (
    <div className="container">
      <div className="card" style={{maxWidth: 560, margin: '8vh auto'}}>
        <h1>Se connecter</h1>
        <p>Par e‑mail (OTP) ou via Google/Apple.</p>

        {!sent ? (
          <>
            <div className="row" style={{marginTop:'.8rem'}}>
              <input
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                style={{flex:1}}
              />
              <button onClick={sendOtp} disabled={!email || loading}>
                {loading ? 'Envoi…' : 'Recevoir le code'}
              </button>
            </div>
            <div style={{opacity:.7, fontSize:'.9rem', marginTop:'.5rem'}}>
              Tu recevras un lien/code valable quelques minutes.
            </div>

            <div className="hr"></div>
            <AuthButtons />
          </>
        ) : (
          <p>📧 Vérifie ta boîte mail et clique sur le lien / entre le code OTP, tu seras connecté.</p>
        )}
      </div>
    </div>
  )
}
