// src/components/CaretTextEffect.tsx

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import styles from '../styles/CaretTextEffect.module.css';

interface CaretTextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const CaretTextEffect: React.FC<CaretTextEffectProps> = ({ text, className, style }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  const rafRef = useRef<number>(0);
  const lastMouseX = useRef<number | null>(null);

  // Fungsi untuk menghitung persentase isi teks berdasarkan posisi kursor
  const updateFillPercentage = useCallback((clientX: number) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    // Hitung posisi x kursor relatif terhadap elemen teks
    const x = clientX - rect.left;
    const maxFill = rect.width;

    // Hitung persentase fill, pastikan nilainya antara 0 dan 100
    // Ditambah logika sederhana: jika kursor keluar ke kiri (<0), tetap 0, jika ke kanan (>100), tetap 100.
    const newPercent = Math.max(0, Math.min((x / maxFill) * 100, 100));
    setPercent(newPercent);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    lastMouseX.current = event.clientX;
    
    // Gunakan requestAnimationFrame untuk update yang lebih efisien dan smooth
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
        if (lastMouseX.current !== null) {
            updateFillPercentage(lastMouseX.current);
        }
    });
  }, [updateFillPercentage]);

  const handleMouseLeave = useCallback(() => {
    // Kembalikan fill ke 0% saat kursor meninggalkan area, memperlihatkan outline saja
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
    }
    setPercent(0);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      // Event listener dipasang di window agar bisa 'menarik' fill-nya meskipun kursor agak ngebut
      window.addEventListener('mousemove', handleMouseMove as EventListener);
      wrapper.addEventListener('mouseleave', handleMouseLeave as EventListener);
    }

    return () => {
        // Cleanup event listeners
        window.removeEventListener('mousemove', handleMouseMove as EventListener);
        if (wrapper) {
            wrapper.removeEventListener('mouseleave', handleMouseLeave as EventListener);
        }
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
    };
  }, [handleMouseMove, handleMouseLeave]);

  const combinedStyle = useMemo(() => ({
    ...style,
    // Set CSS variable untuk mengontrol posisi gradient mask di CSS
    '--caret-fill-percent': `${percent}%`,
    '--fill-transition-duration': '0.1s', /* Transisi geser yang sangat cepat */
  } as React.CSSProperties), [percent, style]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles['caret-effect-wrapper']} ${className || ''}`}
      style={combinedStyle}
      data-text={text} // Penting: mengirim teks ke pseudo-element untuk outline
    >
      <span className={styles['caret-effect-filled-text']}>
        {text}
      </span>
    </div>
  );
};

export default CaretTextEffect;