import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
    state: () => ({ sidebarOpen: false }),
    actions: {
        open() { this.sidebarOpen = true; },
        close() { this.sidebarOpen = false; },
        toggle() { this.sidebarOpen = !this.sidebarOpen; },
    },
});