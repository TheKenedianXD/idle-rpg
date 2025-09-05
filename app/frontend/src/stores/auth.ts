import { defineStore } from 'pinia';

type User = {
    id: number;
    name: string;
    level: number;
    essence: number;
};

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        isAuthenticated: (s) => !!s.user,
    },
    actions: {
        loginMock(name: string) {
            this.user = {
                id: 1,
                name: name || 'PLAYER_NAME',
                level: 1,
                essence: 0,
            };
        },
        registerMock(name: string) {
            this.loginMock(name);
        },
        logout() {
            this.user = null;
        },
    },
});
