import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant w-full sticky top-0 z-50">
      <nav className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto w-full">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">CinemaNana</Link>
        <div className="hidden md:flex items-center gap-xl">
          <Link to="/" className={`font-label-md text-label-md transition-all ${location.pathname === '/' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}>Beranda / Film</Link>
          {user && <Link to="/history" className={`font-label-md text-label-md transition-all ${location.pathname === '/history' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}>Riwayat Pesanan</Link>}
        </div>
        <div className="flex items-center gap-md">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-body-sm text-on-surface-variant">Hai, {user.name}</span>
              <button onClick={logout} className="p-base rounded-full hover:bg-surface-container-low transition-colors duration-200 text-on-surface-variant hover:text-error" title="Keluar">
                <span className="material-symbols-outlined" data-icon="logout">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-label-md text-primary hover:underline">Masuk</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
