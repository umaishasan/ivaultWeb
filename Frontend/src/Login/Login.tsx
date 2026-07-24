import { useState, type FormEvent } from 'react'
import { useNavigate } from "react-router-dom"
import './login.css'

function Login() {
  var loginApiUrl = 'http://localhost:5000/api/login';
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  //agar event hai to preventDefault() chalao, matlab browser ka default form submit refresh roko
  //event = form submit event, ? = ho sakta hai na bhi ho, FormEvent = TypeScript mein event ka type
  async function UserLogin(event?: FormEvent) {
    try {
      event?.preventDefault();
      const respone = await fetch(loginApiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });

      const data = await respone.json().catch(() => ({}));

      console.log('Login attempt:', { email, password });
      console.log('Login response:', data);

      if (respone.ok) {
        navigate('/dashboard');
      } else {
        // handle non-OK (e.g., show message) — for now, log
        console.error('Login failed', data);
      }
    } catch (err) {
      console.error('Login error', err);
    }
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
          <form onSubmit={UserLogin} className="login-form">
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