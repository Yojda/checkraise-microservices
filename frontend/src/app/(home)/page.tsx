'use client';

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Header from "@/packages/ui-kit/Header";
import Footer from "@/packages/ui-kit/Footer";
import LivesWidget from "@/components/lives/LivesWidget";
import Loading from "./loading";
import {FaCheck} from "react-icons/fa";
import {useAuthStore} from "@/stores/authStore";
import {livesService} from "@/services/lives-service/livesService";
import {problemsService} from "@/services/problems-service/problemsService";

const categories = ["Tous les problèmes", "Non Résolus", "Résolus"];

export default function ProblemsPage() {
    const router = useRouter();
    const {user, token, fetchProfile} = useAuthStore();

    // Lives
    const [lives, setLives] = useState(0);
    const [maxLives, setMaxLives] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    // Problems
    const [problems, setProblems] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Tous les problèmes");

    // Loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let currentUser = user;

                if (!currentUser) {
                    currentUser = await fetchProfile().then(() => useAuthStore.getState().user);
                }

                if (!currentUser?.email) {
                    throw new Error("Utilisateur sans email");
                }

                const livesData = await livesService.getLives(currentUser.email);
                setLives(livesData.current);
                setMaxLives(livesData.max);
                setTimeLeft(livesData.timeLeft);

                // Problems microservice
                const allProblems = await problemsService.getProblems();
                setProblems(allProblems);
            } catch (err) {
                console.error("Erreur de chargement des données :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchProfile, user]);


    if (loading) return <Loading/>;

    const filteredProblems = problems.filter((p) => {
        if (selectedCategory === "Tous les problèmes") return true;
        if (selectedCategory === "Résolus") return p.state === "correct";
        if (selectedCategory === "Non Résolus") return p.state !== "correct";
        return true;
    });

    const total = problems.length;
    const correctCount = problems.filter((p) => p.state === "correct").length;

    return (
        <div
            className="bg-fixed bg-cover bg-center w-screen min-h-screen px-6 py-8"
            style={{backgroundImage: "url('/images/bg1.png')"}}
        >
            <Header pageName="Poker Practice"/>

            <LivesWidget
                lives={lives}
                maxLives={maxLives}
                getTimeLeft={() => timeLeft}
                isAuthenticated={!!user}
            />

            <div className="max-w-[1000px] mx-auto">
                <div className="text-white hidden md:flex text-4xl mb-16 font-bold leading-tight w-2/3">
                    <h1>
                        Bonjour {user ? user.username : "Invité"} ! 👋 <br/>
                        <span className="text-">Choisis un des problèmes </span>
                        en dessous pour commencer. ⬇️
                    </h1>
                </div>

                <div className="flex gap-4 my-6 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full font-semibold ${
                                selectedCategory === cat
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white hover:bg-white/10"
                            } transition`}
                        >
                            {cat}{" "}
                            {cat === "Tous les problèmes"
                                ? total
                                : cat === "Résolus"
                                    ? correctCount
                                    : total - correctCount}
                        </button>
                    ))}
                </div>

                <ul className="space-y-2">
                    {filteredProblems.length > 0 ? (
                        filteredProblems.map((p) => {
                            const indicator =
                                p.state === "correct" ? <FaCheck className="ml-2 text-green-400"/> : null;
                            const isDisabled = !!user && lives <= 0;

                            return (
                                <li key={p.id}>
                                    <div
                                        className={`flex items-center justify-between py-3 px-8 rounded-lg transition-colors ${
                                            isDisabled
                                                ? "opacity-50 bg-[#2A374450] cursor-not-allowed"
                                                : p.state === "correct"
                                                    ? "bg-[#1FCC3590] cursor-pointer"
                                                    : "hover:bg-[#2A374450] cursor-pointer"
                                        }`}
                                        onClick={() => {
                                            if (!isDisabled) router.push(`/problems/${p.id}`);
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 text-white font-semibold">
                                                {p.id}. {p.title} {indicator}
                                            </div>
                                        </div>
                                        <div className="flex rounded-md bg-slate-800 py-0.5 px-2.5 text-sm text-white">
                                            <p
                                                className={`text-sm font-semibold ${
                                                    p.difficulty === "easy"
                                                        ? "text-blue-400"
                                                        : p.difficulty === "medium"
                                                            ? "text-orange-400"
                                                            : "text-red-400"
                                                }`}
                                            >
                                                {p.difficulty}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <p className="text-white">Aucun problème trouvé.</p>
                    )}
                </ul>

                <Footer/>
            </div>
        </div>
    );
}
