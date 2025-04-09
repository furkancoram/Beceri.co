import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/profilim');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/profilim');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-navy dark:text-mint mb-6 text-center">Giriş Yap</h2>

        <input
          type="email"
          name="email"
          placeholder="E-posta"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-mint text-navy font-semibold py-3 rounded-xl hover:opacity-90 transition"
        >
          Giriş Yap
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-4 border border-mint text-mint font-semibold py-3 rounded-xl hover:bg-mint hover:text-navy transition"
        >
          Google ile Giriş Yap
        </button>

        {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-500">
          Hesabın yok mu?{' '}
          <Link to="/kayit" className="text-mint hover:underline">Kayıt Ol</Link>
        </p>
      </form>
    </div>
  );
}
