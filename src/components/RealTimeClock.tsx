// src/components/RealTimeClock.tsx
import React, { useState, useEffect } from 'react';

// Fungsi untuk memformat waktu dan tanggal
const formatDateTime = (date: Date): { time: string; date: string } => {
  // Opsi untuk jam (format 24 jam)
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, 
  });

  // Opsi untuk tanggal (hari, bulan, tanggal, tahun)
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  return {
    time: timeFormatter.format(date),
    // Kita buat semua huruf kapital agar lebih berkarakter
    date: dateFormatter.format(date).toUpperCase(), 
  };
};

const RealTimeClock: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Memperbarui waktu setiap 1000ms (1 detik)
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Cleanup function untuk menghentikan timer saat komponen di-unmount
    return () => clearInterval(timerId);
  }, []);

  const { time, date } = formatDateTime(currentDate);

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        color: '#090040', 
        fontFamily: 'Lexend, sans-serif',
        fontSize: '0.9rem',
        fontWeight: 400,
        lineHeight: 1.2,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: '1.1em' }}>{time}</span>
      <span>{date}</span>
    </div>
  );
};

export default RealTimeClock;