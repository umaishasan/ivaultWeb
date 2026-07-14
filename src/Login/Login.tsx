import { useState, type FormEvent } from 'react'
import { useNavigate } from "react-router-dom"
import './login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Login attempt:', { email, password })
    navigate('/dashboard')
  }

  return (
    <div className="app-shell">
      <div className="background-glow"></div>
      <main className="login-page">
        <header className="brand">
          <div className="brand-icon" aria-hidden="true">
            <span className="lock-shape" />
          </div>
          <div>
            <p className="brand-label">i-Vault</p>
            <p className="brand-subtitle">Secure your Asset</p>
          </div>
        </header>

        <section className="login-card">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </section>

        <footer className="login-footer">
          <p>Note: Compliance and data privacy for entities in retail/enterprise audit/contact.</p>
        </footer>
      </main>
    </div>
  )
}

export default Login
