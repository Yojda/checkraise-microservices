import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ProblemState, ProblemStateDTO} from "../shared-types/ProblemState";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterProblems(
  problems: Record<number, ProblemStateDTO>,
  selectedCategory: string
): Record<number, ProblemStateDTO> {
  let filteredArray: ProblemStateDTO[];

  if (selectedCategory === "Tous les problèmes") {
    return problems; // pas de filtre
  }

  if (selectedCategory === "Résolus") {
    filteredArray = Object.values(problems).filter(p => p?.state === "correct");
  } else if (selectedCategory === "Non Résolus") {
    filteredArray = Object.values(problems).filter(p => p?.state !== "correct");
  } else {
    filteredArray = Object.values(problems).filter(p =>
      p.problem.categories?.includes(selectedCategory)
    );
  }

  // transformer le tableau filtré en Record<number, ProblemState>
  return Object.fromEntries(filteredArray.map(p => [p.problem.problemNumber, p])) as Record<number, ProblemStateDTO>;
}
