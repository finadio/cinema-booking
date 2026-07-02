import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function History() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/bookings/user/${user.id}`);
      setBookings(res.data.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancel = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        alert('Gagal membatalkan pesanan');
      }
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-container-max mx-auto w-full px-gutter py-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl border-b border-outline-variant pb-md">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Riwayat Pesanan</h1>
          <Link to="/" className="inline-flex items-center gap-xs px-md py-sm bg-primary-container text-on-primary-container font-label-md rounded hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined text-[18px]" data-icon="movie">movie</span>
            Jelajahi Film
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-xl text-on-surface-variant font-body-lg">Memuat riwayat pesanan...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-xl text-on-surface-variant font-body-lg bg-surface border border-outline-variant rounded-lg">Belum ada riwayat pesanan.</div>
        ) : (
          <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Film</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Detail</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Tanggal</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">Tiket</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors">
                    <td className="p-md">
                      <div className="w-16 aspect-[2/3] bg-surface-container-high rounded overflow-hidden flex items-center justify-center text-[10px] text-outline border border-outline-variant relative">
                        {booking.movie_poster ? (
                          <img src={booking.movie_poster} alt={booking.movie_title} className="w-full h-full object-cover" />
                        ) : (
                          <span>Tanpa Poster</span>
                        )}
                      </div>
                    </td>
                    <td className="p-md">
                      <h3 className="font-headline-md text-on-surface leading-tight mb-xs">{booking.movie_title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">ID: #{booking.id}</p>
                    </td>
                    <td className="p-md font-body-md text-body-md text-on-surface">
                      {new Date(booking.booking_date).toLocaleDateString('id-ID', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="p-md font-body-md text-body-md text-on-surface text-center">
                      {booking.ticket_count}
                    </td>
                    <td className="p-md font-label-md text-label-md text-on-surface">
                      Rp {parseFloat(booking.total_price).toLocaleString('id-ID')}
                    </td>
                    <td className="p-md">
                      <span className="px-sm py-xs bg-[#E6F4EA] text-[#137333] font-label-sm text-label-sm rounded uppercase tracking-wider">
                        {booking.status === 'success' ? 'SUKSES' : booking.status}
                      </span>
                    </td>
                    <td className="p-md text-center">
                      <button onClick={() => handleCancel(booking.id)} className="text-error hover:text-error/80 transition-colors" title="Batalkan Pesanan">
                        <span className="material-symbols-outlined text-[20px]" data-icon="cancel">cancel</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
