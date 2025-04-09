import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setForm({ ...form, email: e.target.value });
  const handlePasswordChange = (e) => setForm({ ...form, password: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      alert('Kayıt başarılı!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('Google ile giriş başarılı!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy">
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-navy dark:text-mint mb-6 text-center">Kayıt Ol</h2>

        <input
          type="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleEmailChange}
          className="w-full mb-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handlePasswordChange}
          className="w-full mb-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          required
        />

        <button type="submit" className="w-full bg-mint text-navy font-semibold py-3 rounded-xl hover:opacity-90 transition">
          E-Posta ile Kayıt Ol
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full mt-4 border border-mint text-mint font-semibold py-3 rounded-xl hover:bg-mint hover:text-navy transition"
        >
          Google ile Kayıt Ol
        </button>

        {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-500">
          Zaten hesabın var mı?{' '}
          <Link to="/giris" className="text-mint hover:underline">
            Giriş Yap
          </Link>
        </p>
      </form>
    </div>
  );
}
