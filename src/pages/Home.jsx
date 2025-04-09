// src/pages/Home.jsx
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy transition-colors">
      <div className="text-center p-6">
        <h1 className="text-5xl font-bold text-navy dark:text-mint mb-4">beceri.co</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Becerilerini Paylaş, Yeni Şeyler Öğren!</p>
        <div className="flex justify-center gap-4">
          <button className="bg-mint text-navy font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition">Kayıt Ol</button>
          <button className="border-2 border-mint text-mint font-semibold px-6 py-2 rounded-xl hover:bg-mint hover:text-navy transition">Giriş Yap</button>
        </div>
      </div>
    </div>
  );
}
