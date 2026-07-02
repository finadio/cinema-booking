import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    duration: '',
    rating: '',
    poster: '',
    description: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchMovie = async () => {
        try {
          const res = await api.get(`/movies/${id}`);
          setFormData(res.data.data);
        } catch (err) {
          setError('Failed to load movie details for editing.');
        }
        setLoading(false);
      };
      fetchMovie();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      if (isEdit) {
        await api.put(`/movies/${id}`, formData);
        alert('Movie updated successfully!');
      } else {
        await api.post('/movies', formData);
        alert('Movie added successfully!');
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEdit ? 'update' : 'add'} movie.`);
    }
    setSaving(false);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-container-max mx-auto w-full px-gutter py-lg">
        <Link to="/" className="inline-flex items-center gap-xs font-label-md text-label-md text-primary hover:underline mb-lg">
          <span className="material-symbols-outlined text-[18px]" data-icon="arrow_back">arrow_back</span>
          Back to Movies
        </Link>
        
        <div className="bg-surface border border-outline-variant rounded-lg p-xl max-w-3xl mx-auto">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
            {isEdit ? 'Edit Movie' : 'Add New Movie'}
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-xl">
            {isEdit ? 'Update the details of the movie in the catalog.' : 'Enter the details for the new movie.'}
          </p>

          {loading ? (
            <div className="text-center py-xl text-on-surface-variant font-body-lg">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-lg">
              {error && (
                <div className="p-4 rounded bg-error-container border border-error/20 text-on-error-container font-body-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="flex flex-col space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="title">Movie Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-12 px-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all" 
                    placeholder="E.g. Inception"
                  />
                </div>
                
                <div className="flex flex-col space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="genre">Genre</label>
                  <select 
                    id="genre" 
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full h-12 px-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all appearance-none" 
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    <option value="Action">Action</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Thriller">Thriller</option>
                  </select>
                </div>
                
                <div className="flex flex-col space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="duration">Duration (minutes)</label>
                  <input 
                    type="number" 
                    id="duration" 
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full h-12 px-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all" 
                    placeholder="E.g. 148"
                  />
                </div>

                <div className="flex flex-col space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="rating">Rating (0-10)</label>
                  <input 
                    type="number" 
                    id="rating" 
                    name="rating"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full h-12 px-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all" 
                    placeholder="E.g. 8.8"
                  />
                </div>
              </div>
              
              <div className="flex flex-col space-y-base">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="poster">Poster URL</label>
                <input 
                  type="text" 
                  id="poster" 
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  className="w-full h-12 px-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all" 
                  placeholder="E.g. https://example.com/poster.jpg"
                />
              </div>
              
              <div className="flex flex-col space-y-base">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="description">Description (Synopsis)</label>
                <textarea 
                  id="description" 
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all resize-y" 
                  placeholder="Enter the movie synopsis..."
                ></textarea>
              </div>

              <div className="pt-md flex justify-end gap-md">
                <Link to="/" className="px-xl h-12 flex items-center justify-center font-label-md text-label-md uppercase tracking-widest rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-xl h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-xs disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]" data-icon="save">save</span>
                  <span>{saving ? 'Saving...' : 'Save Movie'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
