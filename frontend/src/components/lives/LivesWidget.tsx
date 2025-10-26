import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Heart, X, HeartPlus} from "lucide-react";
import {FaCrown, FaDiscord, FaHeart} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/packages/ui-kit/tooltip";
import {formatCountdown} from "@/packages/shared-utils/formatCountdown";

type LivesWidgetProps = {
    lives: number;
    maxLives: number;
    getTimeLeft: () => number;
    isAuthenticated: boolean;
};

export default function LivesWidget({lives, maxLives, getTimeLeft, isAuthenticated}: LivesWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [seconds, setSeconds] = useState<number>(() => getTimeLeft());

    useEffect(() => {
        // Mettre à jour le compteur une seule fois au montage
        setSeconds(getTimeLeft());

        const interval = setInterval(() => {
            setSeconds((s) => {
                // calculer le temps restant depuis le store à chaque tick
                const newTime = getTimeLeft();
                return Math.max(0, Math.min(s - 1, newTime));
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-1">
            {/* Toggle Button */}
            {!isOpen && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex-grow flex overflow-y-auto gap-4 items-center justify-left"
                        >
                            <div
                                className="p-4 hover:bg-[#440000] md:bg-transparent bg-[#440000] rounded-2xl flex items-center justify-center font-bold text-3xl gap-4 cursor-pointer">
                                <div>
                                    {lives} <span className="text-base text-gray-400">/ {maxLives}</span>
                                </div>
                                <FaHeart size={32} className="text-red-600"/>
                            </div>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Vies restantes</p>
                    </TooltipContent>
                </Tooltip>
            )}

            {/* Lives Window */}
            {isOpen && (
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    className={`${
                        isAuthenticated && (lives <= 0) && (seconds > 0) ? 'h-52' : 'h-32'
                    } w-80 bg-[#1F2A35F0] hover:bg-[#1F2A35] rounded-2xl shadow-xl p-4 flex flex-col cursor-pointer backdrop-blur-lg`}
                    onClick={() => setIsOpen(false)}
                >

                    {/* Content Area */}
                    {isAuthenticated && (lives <= 0) && (seconds > 0) &&
                        <div className="flex-grow flex overflow-y-auto gap-4 items-center justify-left">
                            <div className="p-4 bg-gray-600 rounded-2xl text-4xl">
                                😭
                            </div>
                            <p className="text-gray-400 mt-2">Tu n'as plus de vie</p>
                        </div>}

                    {(lives < maxLives) ?
                        <div className="flex-grow flex overflow-y-auto gap-4 items-center justify-left">
                            <div className="p-4 bg-blue-500 rounded-2xl">
                                <HeartPlus size={48}/>
                            </div>
                            <p className="text-gray-400 mt-2"><span
                                className="font-bold text-blue-500">{formatCountdown(seconds)}</span> restantes pour la
                                prochaine vie</p>
                        </div>
                        : <div className="flex-grow flex overflow-y-auto gap-4 items-center justify-left">
                            <div className="p-4 bg-yellow-500/20 rounded-2xl">
                                <FaCrown size={48} className="text-yellow-300"/>
                            </div>
                            <p className="text-gray-400 mt-2">Tu as toutes tes vies !</p>
                        </div>}
                </motion.div>
            )}
        </div>
    );
}
