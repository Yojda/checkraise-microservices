export const problemsService = {
  getProblems: async (): Promise<
    {
      problemNumber: number;
      title: string;
      description: string;
      explanation: string;
      options: string[];
      solution: string;
      difficulty: "Easy" | "Medium" | "Hard";
      state: "correct" | "incorrect" | null;
    }[]
  > => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PROBLEMS_SERVICE_URL}/`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error("Impossible de récupérer les problèmes");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("problemsService.getProblems error:", err);
      return [];
    }
  },
};
