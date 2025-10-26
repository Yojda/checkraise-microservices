import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="text-7xl font-bold mb-6 drop-shadow-lg">404</div>
      <div className="text-2xl mb-4 font-light opacity-80">Le problème n'existe plus ou n'a jamais existé</div>
      <Link href="/frontend/public" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
        Retour à l'accueil
      </Link>
    </div>
  );
}

