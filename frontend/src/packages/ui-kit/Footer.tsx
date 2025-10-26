import React from "react";
import { FaDiscord } from "react-icons/fa";
import {useRouter} from "next/navigation";

const Footer: React.FC = () => {
    const router = useRouter();

  return (
    <footer className="text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo et description */}
        <div>
          <h2 className="text-xl font-bold text-white">Checkraise.fr</h2>
          <p className="mt-2 text-sm">
            La plateforme ultime pour améliorer vos compétences en poker à travers des problèmes interactifs et des analyses détaillées.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-white">Problèmes</a></li>
            <li><a href="/roadmap" className="hover:text-white">Roadmap</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-white font-semibold mb-2">Suivez-nous</h3>
            <button
                className="flex items-center gap-2 px-4 py-2 bg-[#5165f650] hover:bg-[#5165f6] text-white font-semibold rounded hover:shadow-xl transition"
                onClick={() => router.push("https://discord.gg/tMdYK6PtK2")}
                style={{ cursor: "pointer" }}
              >
                <FaDiscord className="w-5 h-5"/>
            </button>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Checkraise.fr. Fait avec ❤️ par Yannis.
      </div>
    </footer>
  );
};

export default Footer;
