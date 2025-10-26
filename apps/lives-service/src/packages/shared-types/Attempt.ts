export type AttemptPrisma = {
    id: number;
    problem_id: number;
    user_id: number;
    answer: string;
    is_correct: boolean;
    submitted_at: Date | null;
}