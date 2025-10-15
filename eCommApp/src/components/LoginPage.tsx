import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setLoginError('');
            setUsername('');
            setPassword('');
            navigate('/admin');
        } else {
            setLoginError('Invalid credentials');
        }
    };

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="login-container">
                    <h2>Admin Login</h2>
                    {/* Let's make sure we switch the default admin credentials away from 'admin'/'admin' to something more secure */}
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ marginBottom: '1rem', padding: '0.5rem' }}
                            autoFocus
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ marginBottom: '1rem', padding: '0.5rem' }}
                        />
                        <button type="submit" style={{ padding: '0.5rem' }}>Login</button>
                        {loginError && <p style={{ color: 'red', marginTop: '1rem' }}>{loginError}</p>}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;
