// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    try {
      await register(form.username, form.email, form.password);
      navigate('/login');
    } catch {
      setError('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <input name="username" placeholder="Usuario" value={form.username}
             onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email}
             onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" value={form.password}
             onChange={handleChange} required />
      <button>Registrar</button>
    </form>
  );
}
