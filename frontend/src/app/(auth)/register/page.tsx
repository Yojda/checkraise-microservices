'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error, success } = useAuthStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    await register(username, email, password);

    if (!error) {
      setTimeout(() => {
        router.push('/');
      }, 1200);
    }
  };

  return (
    <div
      className="bg-fixed bg-cover bg-center w-screen min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
      style={{ backgroundImage: "url('/images/bg4.png')" }}
    >
      <Link
        href="/"
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
        onSubmit={handleRegister}
        className="bg-slate-700/70 p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Inscription</h1>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 rounded bg-slate-800/80 text-white border border-slate-800"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-semibold transition ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Création du compte...' : 'Créer un compte'}
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Déjà inscrit ?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
