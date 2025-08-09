import { supabase } from '../lib/supabase'

export default function AuthButtons(){
  const signIn = (provider: 'google'|'apple'|'github') =>
    supabase.auth.signInWithOAuth({ provider, options:{ redirectTo: window.location.origin } })

  return (
    <div className="row">
      <button onClick={()=>signIn('google')}>Continuer avec Google</button>
      <button onClick={()=>signIn('apple')}>Continuer avec Apple</button>
    </div>
  )
}
