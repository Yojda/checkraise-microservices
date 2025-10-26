export const livesService = {
  getLives: async (email?: string, token?: string) => {
    if (!email) throw new Error("Email manquant pour récupérer les vies");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LIVES_SERVICE_URL}/get?email=${encodeURIComponent(email)}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        }
      );

      const text = await res.text();
      if (!res.ok) throw new Error(`Erreur ${res.status}: ${text}`);
      const data = JSON.parse(text);

      return {
        current: data.lives,
        max: data.maxLives,
        timeLeft: data.timeLeft ?? 0,
      };
    } catch (err) {
      console.error("livesService.getLives error:", err);
      return { current: 0, max: 0, timeLeft: 0 };
    }
  },
};
