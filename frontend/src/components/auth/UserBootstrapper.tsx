"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useLivesStore } from "@/stores/livesStore";

export default function UserBootstrapper() {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const fetchLives = useLivesStore((s) => s.fetchLives);
  const { setLivesLoading } = useLivesStore();

  useEffect(() => {
    fetchUser().then(user => {
      if (user) fetchLives(user).then();
      else setLivesLoading(false);
    });
  }, [fetchUser, fetchLives]);

  return null; // nothing to render
}
