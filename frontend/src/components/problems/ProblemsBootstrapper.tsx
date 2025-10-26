"use client";

import { useEffect } from "react";
import {useProblemStore} from "@/stores/problemStore";

export default function UserBootstrapper() {
  const fetchProblems = useProblemStore((s) => s.fetchProblems);

  useEffect(() => {
    fetchProblems().then();
  }, [fetchProblems]);

  return null; // nothing to render
}
