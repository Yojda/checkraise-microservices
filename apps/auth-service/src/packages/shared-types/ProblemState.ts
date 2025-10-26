import {Problem, ProblemDTO} from "./Problem";
import {User, UserDTO} from "./User";

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

