"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/stores/authStore";
import {livesService} from "@/services/lives-service/livesService";
import {problemsService} from "@/services/problems-service/problemsService";
import LivesWidget from "@/components/lives/LivesWidget";
import Loading from "./loading";
import ReactMarkdown from "react-markdown";

export default function ProblemPage({problemId}: { problemId: number }) {
    const router = useRouter();

    const {user} = useAuthStore();
    const [lives, setLives] = useState(0);
    const [maxLives, setMaxLives] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [problem, setProblem] = useState<any | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (!user) return;

                // Vies
                const livesData = await livesService.getLives(user.email);
                setLives(livesData.current);
                setMaxLives(livesData.max);
                setTimeLeft(livesData.timeLeft);

                // Problèmes
                const allProblems = await problemsService.getProblems();
                console.log("All problems:", allProblems);
                const current = allProblems.find(p => p.id === problemId) || null;
                console.log("Current problem:", current);
                setProblem(current);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [problemId, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) return setResult("Veuillez choisir une réponse.");
        if (selected === problem.solution) {
            setResult("✅ Correct !");
        } else {
            setResult("❌ Incorrect !");
            setLives((prev) => Math.max(prev - 1, 0));
        }
    };

    if (loading) return <Loading/>;

    if (!problem) return <div className="p-8 text-white">Problème non trouvé</div>;

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6 max-w-[1000px] mx-auto">
            <button onClick={() => router.push("/")} className="mb-4 px-3 py-2 bg-gray-700 rounded">
                Retour
            </button>

            <LivesWidget lives={lives} maxLives={maxLives} getTimeLeft={() => timeLeft} isAuthenticated={!!user}/>

            <h1 className="text-2xl font-bold mt-4">{problem.id}. {problem.title}</h1>
            <div className="my-4 prose prose-invert max-w-none">
                <ReactMarkdown>{problem.description}</ReactMarkdown>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {problem.options.map((opt: string, i: number) => {
                    const isSelected = selected === opt;
                    return (
                        <label
                            key={i}
                            className={`
            block p-3 border rounded cursor-pointer transition-all duration-200
            ${isSelected
                                ? "bg-blue-500 border-blue-400 text-white shadow-lg"
                                : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                            }
          `}
                        >
                            <input
                                type="radio"
                                name="answer"
                                value={opt}
                                checked={isSelected}
                                onChange={() => setSelected(opt)}
                                className="hidden"
                            />
                            {opt}
                        </label>
                    );
                })}
                <button
                    type="submit"
                    disabled={lives <= 0}
                    className="px-4 py-3 rounded bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-50"
                >
                    VALIDER
                </button>
            </form>

            {result && <div className="mt-4 p-3 rounded bg-gray-700">{result}</div>}
        </div>

    );
}
