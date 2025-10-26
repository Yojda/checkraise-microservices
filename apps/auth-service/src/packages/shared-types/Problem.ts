import type {JsonValue} from "type-fest";

export type Problem = {
    id?: number;
    problemNumber: number;
    title: string;
    difficulty: string;
    categories: string[];
    description: string;
    replayerUrl: string | null;
    options: JsonValue | null;
    solution: string | null;
    explanation: string | null;
};

export type ProblemForm = {
    problemNumber?: number;
    title: string;
    difficulty: string;
    categories: string;
    description: string;
    replayerUrl?: string;
    options?: string;
    solution?: string;
    explanation?: string;
}

export type ProblemDTO = Problem;

export type ProblemPrisma = {
    id: number;
    problemNumber: number;
    title: string;
    difficulty: string;
    categories: string[];
    description: string;
    replayerurl: string | null;
    options: JsonValue | null;
    solution: string | null;
    explanation: string | null;
}