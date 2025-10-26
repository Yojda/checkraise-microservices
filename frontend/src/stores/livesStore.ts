import { create } from "zustand";
import { User } from "@/packages/shared-types/User";

const LIVES_API_URL = process.env.NEXT_PUBLIC_LIVES_SERVICE_URL;

interface LivesState {
  lives: number;
  maxLives: number;
  lastLifeLostAt?: Date;
  livesLoading: boolean;
  setLivesLoading: (loading: boolean) => void;
  fetchLives: (user: User) => Promise<void>;
  loseLife: (user: User) => Promise<void>;
  gainLife: (user: User) => Promise<void>;
}

export const useLivesStore = create<LivesState>((set, get) => ({
  lives: 0,
  maxLives: 3,
  livesLoading: false,

  setLivesLoading: (loading: boolean) => set({ livesLoading: loading }),

  // GET /lives/get?email=...
  fetchLives: async (user: User) => {
    set({ livesLoading: true });
    try {
      const res = await fetch(`${LIVES_API_URL}/get?email=${user.email}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des vies");
      const livesInfo = await res.json();
      set({
        lives: livesInfo.lives ?? 0,
        maxLives: livesInfo.maxLives ?? 3,
        lastLifeLostAt: livesInfo.lastLifeLostAt ? new Date(livesInfo.lastLifeLostAt) : undefined,
      });
    } catch (err) {
      console.error("[fetchLives] error:", err);
    } finally {
      set({ livesLoading: false });
    }
  },

  // POST /lives/lost
  loseLife: async (user: User) => {
    const { lives } = get();
    if (lives <= 0) return;
    const now = new Date();
    set({ lives: lives - 1, lastLifeLostAt: now });
    try {
      await fetch(`${LIVES_API_URL}/lost`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, date: now.toISOString() }),
      });
    } catch (err) {
      console.error("[loseLife] error:", err);
    }
  },

  // POST /lives/update
  gainLife: async (user: User) => {
    const { lives, maxLives } = get();
    if (lives >= maxLives) return;
    const newLives = lives + 1;
    set({ lives: newLives });
    try {
      await fetch(`${LIVES_API_URL}/update`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, lives: newLives }),
      });
    } catch (err) {
      console.error("[gainLife] error:", err);
    }
  },
}));