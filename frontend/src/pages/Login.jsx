import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <main className="flex-grow flex items-center justify-center p-gutter">
        <div className="w-full max-w-[440px] bg-white border border-outline-variant rounded-lg p-xl">
          <div className="mb-xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-container text-primary mb-md">
              <span className="material-symbols-outlined text-[28px]" data-icon="confirmation_number">confirmation_number</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Login CinemaNana</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Akses Dasbor Manajemen Bioskop</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 rounded bg-error-container border border-error/20 text-on-error-container font-body-sm">
              {error}
            </div>
          )}

          <form className="space-y-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-base">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="email">Alamat Email</label>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]" data-icon="mail">mail</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cinemanana.com" 
                  className="w-full h-12 pl-[48px] pr-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface placeholder:text-outline input-focus-ring transition-all" 
                />
              </div>
            </div>

            <div className="flex flex-col space-y-base">
              <div className="flex justify-between items-end">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="password">Kata Sandi</label>
              </div>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]" data-icon="lock">lock</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full h-12 pl-[48px] pr-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface placeholder:text-outline input-focus-ring transition-all" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center space-x-sm disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Masuk...' : 'Masuk'}</span>
              <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </form>

          <div className="mt-xl pt-lg border-t border-outline-variant text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Belum punya akun? 
              <Link to="/register" className="text-primary font-medium hover:underline ml-xs">Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
