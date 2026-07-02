import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center py-lg px-gutter max-w-container-max mx-auto w-full">
        <div className="flex flex-col items-center md:items-start gap-xs">
          <div className="font-label-md text-label-md font-bold text-secondary">CinemaNana</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">© 2026 Sistem Pemesanan Bioskop. Proyek BNSP Informatika Unsoed.</p>
        </div>
      </div>
    </footer>
  );
}
