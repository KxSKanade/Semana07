// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');  // ahora username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(username, password);  // pasamos username
      navigate('/');
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}
