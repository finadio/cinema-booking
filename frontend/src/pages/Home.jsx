import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Semua');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchMovies = async (searchQuery = '', genreFilter = 'Semua') => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (genreFilter && genreFilter !== 'Semua') params.genre = genreFilter;
      
      console.log('Fetching movies with params:', params);
      const res = await api.get('/movies', { params });
      console.log('API response:', res.data);
      setMovies(res.data.data || []);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies('', 'Semua');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search, filter);
  };

  const handleFilter = (genre) => {
    setFilter(genre);
    fetchMovies(search, genre);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus film ini?')) {
      try {
        await api.delete(`/movies/${id}`);
        fetchMovies();
      } catch (err) {
        alert(err.response?.data?.message || 'Gagal menghapus film');
      }
    }
  };

  const filterOptions = ['Semua', 'Action', 'Sci-Fi', 'Thriller'];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-container-max mx-auto w-full px-gutter py-lg">
        {/* Header Action & Search/Filter */}
        <div className="flex flex-col gap-lg mb-xl">
          <div className="flex justify-between items-center">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Jelajahi Film</h1>
            {user && (
              <Link to="/movies/add" className="inline-flex items-center gap-xs px-md py-sm bg-primary text-on-primary font-label-md rounded hover:opacity-90 transition-all">
                <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                Tambah Film
              </Link>
            )}
          </div>
          
          <section className="flex flex-col md:flex-row gap-md items-start md:items-center justify-between">
            <form className="relative w-full md:w-[300px] lg:w-[400px] flex-shrink-0" onSubmit={handleSearch}>
              <button type="submit" className="absolute left-[16px] top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors z-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]" data-icon="search">search</span>
              </button>
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-[44px] pr-md py-sm border border-outline-variant rounded bg-surface focus:outline-none focus:border-primary text-body-lg font-body-lg input-focus-ring transition-all" 
                placeholder="Cari film..." 
              />
            </form>
            <div className="flex gap-sm overflow-x-auto pb-sm md:pb-0 w-full md:w-auto">
              {filterOptions.map((opt) => (
                <button 
                  key={opt}
                  type="button"
                  onClick={() => handleFilter(opt)}
                  className={`px-md py-xs rounded-full font-label-md text-label-md cursor-pointer transition-colors whitespace-nowrap ${filter === opt ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant border border-outline-variant hover:bg-surface-container-low'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
          {loading ? (
            <div className="col-span-full text-center py-xl text-on-surface-variant font-body-lg">Memuat film...</div>
          ) : movies.length === 0 ? (
            <div className="col-span-full text-center py-xl text-on-surface-variant font-body-lg">Film tidak ditemukan.</div>
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="bg-surface border border-outline-variant rounded-lg overflow-hidden group flex flex-col hover:border-primary transition-colors">
                <div className="aspect-[2/3] w-full bg-surface-container-low relative overflow-hidden flex-shrink-0">
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-outline font-body-sm">Tanpa Poster</div>
                  )}
                </div>
                <div className="p-md space-y-sm flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2">{movie.title}</h3>
                    <span className="text-label-md font-label-md text-primary bg-primary-fixed px-xs py-[2px] rounded flex-shrink-0">
                      ★ {movie.rating || 'N/A'}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">{movie.genre || 'Umum'}</p>
                  
                  {/* Actions for User */}
                  <div className="mt-4 pt-sm border-t border-outline-variant flex flex-col gap-sm">
                    {user ? (
                      <div className="flex items-center gap-xs">
                        <Link to={`/movies/${movie.id}`} className="flex-1 text-center py-sm bg-primary text-on-primary font-label-md text-label-md rounded hover:opacity-90 transition-all uppercase tracking-wider">
                          Detail
                        </Link>
                        <Link to={`/movies/edit/${movie.id}`} className="px-sm py-sm bg-surface-container border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-container-high transition-colors" title="Edit">
                          <span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                        </Link>
                        <button onClick={() => handleDelete(movie.id)} className="px-sm py-sm bg-error-container text-on-error-container border border-error-container font-label-md rounded hover:opacity-90 transition-colors" title="Hapus">
                          <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                        </button>
                      </div>
                    ) : (
                      <Link to={`/movies/${movie.id}`} className="block w-full text-center py-sm bg-primary text-on-primary font-label-md text-label-md rounded hover:opacity-90 transition-all uppercase tracking-wider">
                        Lihat Detail
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
