import { create } from 'zustand';

const PROBLEMS_API_URL = process.env.NEXT_PUBLIC_PROBLEMS_SERVICE_URL;

interface ProblemStateDTO {
  id: number;
  title: string;
  description: string;
  options: string[];
  answer: string;
  difficulty: string;
  state?: string;
}

interface ProblemStateStore {
  problems: Record<number, ProblemStateDTO>;
  problemsLoading: boolean;
  fetchProblems: () => Promise<Record<number, ProblemStateDTO>>;
  attemptProblem: (userId: number, problemId: number, selected: string) => Promise<{ correct: boolean }>;
}

export const useProblemStore = create<ProblemStateStore>((set, get) => ({
  problems: {},
  problemsLoading: true,

  // GET /problems
  fetchProblems: async () => {
    set({ problemsLoading: true });
    try {
      const res = await fetch(`${PROBLEMS_API_URL}/`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des problèmes");
      const problems = await res.json();
      // On indexe par id pour le store
      const problemsById = Object.fromEntries(problems.map((p: ProblemStateDTO) => [p.id, p]));
      set({ problems: problemsById, problemsLoading: false });
      return problemsById;
    } catch (error) {
      console.error("[problemStore] fetchProblems error:", error);
      set({ problems: {}, problemsLoading: false });
      return {};
    }
  },

  // POST /problems/attempt
  attemptProblem: async (userId: number, problemId: number, selected: string) => {
    try {
      const res = await fetch(`${PROBLEMS_API_URL}/attempt`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, problemId, selected }),
      });
      if (!res.ok) throw new Error("Erreur lors de la tentative");
      const result = await res.json();
      // Met à jour le state local si besoin
      set((state) => ({
        problems: {
          ...state.problems,
          [problemId]: {
            ...state.problems[problemId],
            state: result.correct ? "solved" : "failed",
          },
        },
      }));
      return { correct: result.correct };
    } catch (error) {
      console.error("[problemStore] attemptProblem error:", error);
      return { correct: false };
    }
  },
}));