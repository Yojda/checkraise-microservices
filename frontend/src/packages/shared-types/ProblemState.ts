import {Problem, ProblemDTO} from "@/shared/models/Problem";
import {User, UserDTO} from "@/shared/models/User";

export type ProblemState = {
  problem: Problem;
  state: string | null;
}

export type ProblemStateDTO = {
  problem: ProblemDTO;
  state: string | null;
}

export type ProblemStatePrisma = {
  id: number;
  problem_id: number;
  user_id: number;
  state: string | null;
  countdown_start: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

