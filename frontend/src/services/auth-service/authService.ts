export const authService = {
  getProfile: async (): Promise<{ username: string; email: string } | null> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/me`, {
        credentials: "include", // si tu utilises cookies
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) return null;
      const data = await res.json();
      return data; // { id, username, email }
    } catch (err) {
      console.error("authService.getProfile error:", err);
      return null;
    }
  },
};
