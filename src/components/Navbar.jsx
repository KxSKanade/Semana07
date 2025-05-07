// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function Navbar() {
  const navigate = useNavigate();

  // 1. Leer el usuario del localStorage
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 2. Extraer roles normalizados (sin prefijo ROLE_)
  const roles = user?.roles?.map(r => r.replace(/^ROLE_/, '').toLowerCase()) || [];
  // Ej: ["admin","user"]

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Inicio</Link>

      {!user && (
        <>
          <Link to="/login" className="nav-link">Ingresar</Link>
          <Link to="/register" className="nav-link">Registrarse</Link>
        </>
      )}

      {user && (
        <>
          {/* Usuario normal */}
          {roles.includes('user') && (
            <Link to="/profile" className="nav-link">Mi Perfil</Link>
          )}

          {/* Moderador */}
          {roles.includes('moderator') && (
            <Link to="/moderator" className="nav-link">Panel Moderador</Link>
          )}

          {/* Administrador */}
          {roles.includes('admin') && (
            <Link to="/admin" className="nav-link">Panel Admin</Link>
          )}

          <button onClick={handleLogout} className="nav-button">
            Cerrar Sesión
          </button>
        </>
      )}
    </nav>
  );
}
