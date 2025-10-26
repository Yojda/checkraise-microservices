'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const router = useRouter();

  const { login, error, loading : authLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setLocalError(err.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div
      className="bg-fixed bg-cover bg-center w-screen min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
      style={{ backgroundImage: "url('/images/bg4.png')" }}
    >
      {/* Logo */}
      <Link
        href="/frontend/public"
        className="flex items-center gap-4 py-4 hover:brightness-90 mb-6 transition"
      >
        <img
          src="/images/checkraise-logo-white.svg"
          alt="Checkraise Logo"
          className="w-10 h-auto object-cover transition"
        />
        <span className="text-white font-bold text-lg">Checkraise.fr</span>
      </Link>

      <form
        onSubmit={handleLogin}
        className="bg-slate-700/70 p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-800/80 text-white border border-slate-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 rounded bg-slate-800/80 text-white border border-slate-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Gestion des erreurs */}
        {localError && <p className="text-red-500 text-sm">{localError}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={authLoading}
          className={`w-full py-2 rounded font-semibold transition cursor-pointer ${
            authLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {authLoading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p className="mt-4 text-gray-400 text-sm">
          Pas encore de compte ?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
}
