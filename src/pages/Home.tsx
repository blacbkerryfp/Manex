import { Link } from 'react-router-dom'
import { useSession } from '../hooks/useSession'

export default function Home() {
  const session = useSession()

  return (
    <div className="home">
      {/* HERO */}
      <header className="hero container">
        <div className="hero-badge">MANEX</div>
        <h1 className="hero-title">Simplifiez, centralisez, accédez.</h1>
        <p className="hero-sub">
          Dans un monde où l’efficacité est essentielle, Manex est la solution incontournable
          pour centraliser et gérer vos données en toute simplicité.
        </p>

        <div className="hero-cta">
          {session ? (
            <Link to="/app" className="btn btn-primary">Accéder au Dashboard →</Link>
          ) : (
            <>
              <Link to="/signin" className="btn btn-primary">Commencer maintenant →</Link>
              <Link to="/signin" className="btn btn-ghost">Se connecter</Link>
            </>
          )}
        </div>

        <div className="hero-illus">
          <div className="illus-card">Dashboard Preview</div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="features container">
        <article className="feature">
          <div className="feature-ico">💻</div>
          <h3>Simplicité</h3>
          <p>Une interface claire et pensée pour vous faire gagner du temps.</p>
        </article>
        <article className="feature">
          <div className="feature-ico">🗃️</div>
          <h3>Centralisation</h3>
          <p>Toutes vos données en un seul endroit, accessibles en quelques clics.</p>
        </article>
        <article className="feature">
          <div className="feature-ico">🔐</div>
          <h3>Mobilité</h3>
          <p>Un accès facile et sécurisé depuis n’importe quel appareil.</p>
        </article>
      </section>

      {/* CTA BANDEAU */}
      <section className="cta container">
        <h2>Passez à l’étape supérieure avec Manex</h2>
        <p>Découvrez dès aujourd’hui une nouvelle manière de travailler, plus fluide et plus performante.</p>
        <Link to="/signin" className="btn btn-primary">Commencer maintenant →</Link>
      </section>

      {/* FOOTER */}
      <footer className="site-footer container">
        <div className="f-col">
          <div className="brand">MANEX</div>
          <p>Simplifiez la gestion de vos données avec notre plateforme intuitive et moderne.</p>
        </div>
        <div className="f-col">
          <div className="f-title">Produit</div>
          <Link to="/signin">Fonctionnalités</Link>
          <a href="#">Tarifs</a>
          <a href="#">Documentation</a>
        </div>
        <div className="f-col">
          <div className="f-title">Entreprise</div>
          <a href="#">À propos</a>
          <a href="#">Contact</a>
          <a href="#">Blog</a>
        </div>
        <div className="f-col">
          <div className="f-title">Légal</div>
          <a href="#">Confidentialité</a>
          <a href="#">Conditions</a>
        </div>
      </footer>

      <div className="footer-note">© {new Date().getFullYear()} Manex. Tous droits réservés.</div>
    </div>
  )
}
