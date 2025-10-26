export type User = {
    id: number;
    username: string;
    email: string;
    role: string;
    lives: number;
    maxLives: number;
    lastLifeLostAt: Date | null;
}

export type UserDTO = {
    id: number;
    username: string;
    email: string;
    role: string;
    lives: number;
    maxLives: number;
    lastLifeLostAt: string | null;
}

export type UserPrisma = {
    id: number;
    username: string;
    email: string;
    role: string;
    lives: number;
    maxLives: number;
    lastLifeLostAt: string | null;
}