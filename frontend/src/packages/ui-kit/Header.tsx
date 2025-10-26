"use client";

import Link from "next/link";
import { FaBars, FaDiscord, FaTimes } from "react-icons/fa";
import AuthButtons from "@/components/auth/AuthButtons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/packages/ui-kit/tooltip";
import { authService } from "@/services/auth-service/authService";

type HeaderProps = {
  pageName: string;
};

export default function Header({ pageName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Récupérer l'utilisateur depuis le microservice auth
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await authService.getProfile();
        setUser(profile);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Lock scroll si le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="text-white">
      <div className="max-w-[1200px] mx-auto pt-4 md:pb-16 px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <img
              src="/images/checkraise-logo-white.svg"
              alt="Checkraise Logo"
              className="w-10 h-auto object-cover hover:brightness-90 transition"
            />
            <span className="text-white font-bold text-lg hidden md:inline">
              Checkraise.fr
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-4 items-center">
            <Link
              className={`px-4 py-2 rounded transition ${
                pathname === "/" ? "text-white font-bold cursor-default" : "text-gray-300 hover:bg-white/10"
              }`}
              href="/"
            >
              Problèmes
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-[#5165f650] hover:bg-[#5165f660] text-white font-semibold rounded shadow-lg hover:shadow-xl transition"
                  onClick={() => router.push("https://discord.gg/tMdYK6PtK2")}
                >
                  <FaDiscord className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Discord</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButtons user={user} />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobileMenu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 flex flex-col bg-gray-900 text-white p-6"
            >
              <div className="flex justify-end">
                <button className="text-3xl" onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-grow text-xl font-semibold">
                <button className="py-4 w-full" onClick={() => { setIsOpen(false); router.push("/"); }}>
                  Poker Practice
                </button>
                <button className="py-4 w-full" onClick={() => { setIsOpen(false); router.push("/roadmap"); }}>
                  Roadmap
                </button>
                <button
                  className="flex items-center gap-2 bg-blue-800 px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition"
                  onClick={() => { setIsOpen(false); router.push("https://discord.gg/tMdYK6PtK2"); }}
                >
                  <FaDiscord className="w-5 h-5" />
                  Discord
                </button>
              </div>

              <div className="mt-auto">
                <AuthButtons user={user} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
