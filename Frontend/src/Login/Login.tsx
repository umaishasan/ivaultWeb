import { useState, type FormEvent } from 'react'
import { useNavigate } from "react-router-dom"
import './login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logoImg from '../assets/Logo.png';

function Login() {
  var loginApiUrl = 'http://localhost:5000/api/login';
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

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

      if (respone.ok && data.success && data.data?.length > 0) {
        navigate('/dashboard');
      } else {
        // handle non-OK (e.g., show message) — for now, log
        setShowError(true);
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
        <div className="logoAreaLogin">
            <img src={logoImg} alt="i-Vault Logo" className="headerLogoImgLogin" />
        </div>

        <section className="login-card">
          <h1>Login</h1>
          <form onSubmit={UserLogin} className="login-form">
            <label>
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required/>
            </label>

            <label>
              <span>Password</span>
              {/* Relative wrapper container */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {/* Text icon ke neeche na aaye isliye paddingRight di hai */}
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required style={{ width: '100%', paddingRight: '40px' }}/> 
                <button className="visibility-toggle" type="button" onClick={togglePasswordVisibility} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </label>

            {showError && (
              <label style={{fontSize: 10, color: 'red'}}>Invalid Email or Password</label>
            )}
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