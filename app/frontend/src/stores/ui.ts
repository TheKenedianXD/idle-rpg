import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
    state: () => ({
        sidebarOpen: false,
        settingsOpen: false,
    }),
    actions: {
        closeSidebar() { this.sidebarOpen = false },
        toggleSidebar() { this.sidebarOpen = !this.sidebarOpen },

        openSettings() { this.settingsOpen = true },
        closeSettings() { this.settingsOpen = false },
        isSettingsOpened() { return this.settingsOpen}
    },
});