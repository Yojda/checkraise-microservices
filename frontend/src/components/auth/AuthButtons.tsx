'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {FaSignOutAlt, FaUser} from 'react-icons/fa';
import {useAuthStore} from '@/stores/authStore';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/packages/ui-kit/tooltip';
import {motion} from 'framer-motion';
import {HeartPlus} from 'lucide-react';

export default function AuthButtons() {
    const {user, logout} = useAuthStore();
    const isAuthenticated = !!user;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    if (isAuthenticated && user) {
        return (
            <div className="flex items-center gap-4 py-4 justify-center md:flex-row flex-col">
                <span className="text-gray-400 md:text-white font-semibold">{user.username}</span>

                {/* Profile + dropdown lives menu desktop */}
                <div className="relative md:block hidden">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                className="flex items-center gap-2 p-2 hover:bg-white/10 text-white font-semibold rounded hover:shadow-xl transition cursor-pointer"
                                onClick={() => setIsOpen((prev) => !prev)}
                            >
                                <FaUser size={24}/>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Profil</p>
                        </TooltipContent>
                    </Tooltip>

                    {isOpen && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="absolute right-0 mt-2 w-40 bg-[#1F2A35F0] rounded-2xl shadow-xl p-4 flex flex-col backdrop-blur-lg z-50"
                        >
                            <div className="flex gap-4 items-center">
                                <button
                                    onClick={handleLogout}
                                    className="text-red-400 rounded transition flex items-center gap-2 cursor-pointer"
                                >
                                    <FaSignOutAlt/>
                                    Déconnexion
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Mobile profile button */}
                <button
                    onClick={handleLogout}
                    className="text-red-400 rounded transition flex items-center gap-2 cursor-pointer md:hidden block"
                >
                    <FaSignOutAlt/>
                    Déconnexion
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-blue-700 transition"
            >
                Se connecter
            </button>
            <button
                onClick={() => router.push('/register')}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-green-700 transition"
            >
                S'inscrire
            </button>
        </div>
    );
}
