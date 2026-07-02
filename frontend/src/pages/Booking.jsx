import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState('');
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const TICKET_PRICE = 50000;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data.data);
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
      } catch (err) {
        setError('Failed to load movie details');
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await api.post('/bookings', {
        movie_id: id,
        booking_date: date,
        ticket_count: tickets
      });
      alert('Booking successful!');
      navigate('/history');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-gutter">
        <div className="w-full max-w-[600px] bg-white border border-outline-variant rounded-lg p-xl">
          
          <Link to={`/movies/${id}`} className="inline-flex items-center gap-xs font-label-md text-label-md text-primary hover:underline mb-lg">
            <span className="material-symbols-outlined text-[18px]" data-icon="arrow_back">arrow_back</span>
            Back to Detail
          </Link>
          
          {loading ? (
            <div className="text-center py-xl text-on-surface-variant font-body-lg">Loading...</div>
          ) : !movie ? (
            <div className="text-center py-xl text-on-surface-variant font-body-lg">Movie not found</div>
          ) : (
            <>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Complete Booking</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-xl">Select tickets for <strong>{movie.title}</strong>.</p>
              
              {error && (
                <div className="mb-6 p-4 rounded bg-error-container border border-error/20 text-on-error-container font-body-sm">
                  {error}
                </div>
              )}
              
              <form className="space-y-lg" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Booking Date</label>
                  <div className="relative">
                    <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]" data-icon="calendar_today">calendar_today</span>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full h-12 pl-[48px] pr-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all" 
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-base">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Number of Tickets</label>
                  <div className="flex items-center gap-md">
                    <div className="relative w-32">
                      <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]" data-icon="group">group</span>
                      <input 
                        type="number" 
                        min="1" 
                        max="10"
                        value={tickets}
                        onChange={(e) => setTickets(parseInt(e.target.value) || 1)}
                        required
                        className="w-full h-12 pl-[48px] pr-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg text-on-surface input-focus-ring transition-all text-center" 
                      />
                    </div>
                    <span className="font-body-lg text-on-surface-variant">× Rp {TICKET_PRICE.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                
                <div className="pt-lg border-t border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
                  <div>
                    <span className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">Total Amount</span>
                    <span className="font-headline-lg text-primary">Rp {(tickets * TICKET_PRICE).toLocaleString('id-ID')}</span>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-12 px-xl bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center space-x-sm disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]" data-icon="check_circle">check_circle</span>
                    <span>{isSubmitting ? 'Processing...' : 'Confirm Payment'}</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
