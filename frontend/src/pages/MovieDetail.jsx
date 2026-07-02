import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat detail film');
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-container-max mx-auto w-full px-gutter py-lg">
        <Link to="/" className="inline-flex items-center gap-xs font-label-md text-label-md text-primary hover:underline mb-lg">
          <span className="material-symbols-outlined text-[18px]" data-icon="arrow_back">arrow_back</span>
          Kembali ke Film
        </Link>
        
        {loading ? (
          <div className="text-center py-xl text-on-surface-variant font-body-lg">Memuat...</div>
        ) : error ? (
          <div className="text-center py-xl text-error font-body-lg">{error}</div>
        ) : !movie ? (
          <div className="text-center py-xl text-on-surface-variant font-body-lg">Film tidak ditemukan</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-xl bg-surface border border-outline-variant rounded-lg p-lg md:p-xl">
            <div className="w-full md:w-[300px] aspect-[2/3] bg-surface-container-low rounded relative overflow-hidden flex-shrink-0 border border-outline-variant">
              {movie.poster ? (
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-outline font-body-sm">Tanpa Poster</div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex flex-wrap items-center gap-sm mb-md">
                <span className="px-sm py-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-label-md border border-outline-variant">
                  {movie.genre || 'Umum'}
                </span>
                <span className="font-body-sm text-on-surface-variant flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]" data-icon="schedule">schedule</span>
                  {movie.duration} menit
                </span>
                <span className="font-body-sm text-primary flex items-center gap-xs ml-auto font-semibold">
                  <span className="material-symbols-outlined text-[18px]" data-icon="star">star</span>
                  {movie.rating || 'N/A'}
                </span>
              </div>
              
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg">{movie.title}</h1>
              
              <div className="mb-xl flex-grow">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Sinopsis</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {movie.description || 'Tidak ada deskripsi yang tersedia untuk film ini.'}
                </p>
              </div>
              
              <div className="mt-auto pt-lg border-t border-outline-variant">
                <Link to={`/movies/${id}/book`} className="inline-flex items-center justify-center gap-sm px-xl py-md bg-primary text-on-primary font-label-md text-label-md rounded hover:opacity-90 transition-all uppercase tracking-wider w-full md:w-auto">
                  <span className="material-symbols-outlined text-[18px]" data-icon="local_activity">local_activity</span>
                  Pesan Tiket
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
