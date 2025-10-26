// src/store/authStore.ts
import {create} from 'zustand';

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    error: string | null;
    success: string | null;
    loading: boolean;

    register: (username: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    success: null,

    // === REGISTER ===
    register: async (username, email, password) => {
        const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;
        set({loading: true, error: null, success: null});

        try {
            const res = await fetch(`${AUTH_API_URL}/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password}),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erreur lors de la création du compte.');

            set({success: 'Compte créé avec succès !'});

            // Auto-login après inscription
            const loginRes = await fetch(`${AUTH_API_URL}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const loginData = await loginRes.json();
            if (!loginRes.ok) throw new Error(loginData.error || 'Erreur de connexion automatique.');

            set({
                user: loginData.user,
                token: loginData.token,
                success: 'Connecté automatiquement après inscription !',
            });

            localStorage.setItem('token', loginData.token);
        } catch (err) {
            set({error: (err as Error).message});
        }
    },

    // === LOGIN ===
    login: async (email, password) => {
        const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;
        set({loading: true, error: null, success: null});

        try {
            const res = await fetch(`${AUTH_API_URL}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Email ou mot de passe incorrect.');

            set({
                user: data.user,
                token: data.token,
                success: 'Connexion réussie !',
            });

            localStorage.setItem('token', data.token);
        } catch (err) {
            set({error: (err as Error).message});
        }
    },

    // === LOGOUT ===
    logout: () => {
        localStorage.removeItem('token');
        set({user: null, token: null, success: null, error: null});
    },

    // === FETCH PROFILE ===
    fetchProfile: async () => {
        const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(`${AUTH_API_URL}/me`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            if (!res.ok) throw new Error('Impossible de récupérer le profil');
            const user = await res.json();
            set({user, token});
        } catch (err) {
            console.error('fetchProfile error', err);
        }
    },
}));
