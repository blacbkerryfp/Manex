import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || '/app';

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Un lien de connexion vous a été envoyé par e-mail.");
    }
  }

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
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Connexion à <span style={{ color: '#a78bfa' }}>Manex</span></h1>
      <p style={{ maxWidth: '350px', opacity: 0.8, marginBottom: '2rem' }}>
        Entrez votre adresse e-mail pour recevoir un lien magique de connexion.
      </p>
      <form onSubmit={handleLogin} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '320px'
      }}>
        <input
          type="email"
          placeholder="ton@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '0.8rem',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#a78bfa',
            color: '#fff',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Envoi...' : 'Recevoir le lien'}
        </button>
      </form>
    </div>
  );
}
