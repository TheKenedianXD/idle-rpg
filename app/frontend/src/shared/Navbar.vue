<template>
  <header class="sticky top-0 h-14 border-b border-zinc-800 flex items-center justify-between px-4">
    <div class="flex items-center gap-3">
      <button class="lg:hidden inline-flex items-center gap-2 text-white underline hover:text-indigo-400 transition" @click="ui.toggle()" aria-label="Open menu" :aria-expanded="ui.sidebarOpen">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
          <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>
        </svg>
      </button>
      <span class="text-lg font-semibold">Idle RPG</span>
    </div>

    <nav class="flex items-center gap-4 text-sm">
      <a class="hidden sm:inline text-white hover:text-indigo-400 transition" href="#">{{$t("TOS")}}</a>
      <a class="hidden sm:inline text-white hover:text-indigo-400 transition" href="#">Discord</a>
      <a class="hidden sm:inline text-white hover:text-indigo-400 transition" href="#">{{$t("Changelog")}}</a>
      <LanguageSwitcherDropdown />

      <span v-if="auth.isAuthenticated" class="hidden sm:inline text-zinc-400">|</span>
      <button v-if="auth.isAuthenticated" class="text-zinc-300 hover:text-white cursor-pointer transition" @click="logout">{{$t("Logout")}}</button>
    </nav>

    <div v-if="showConfirm" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
      <div class="bg-zinc-900 border border-zinc-800 rounded-md p-4 w-[90%] max-w-sm">
        <p class="mb-4">{{$t("AreYouSureYouWantToLogout")}}?</p>
        <div class="flex justify-end gap-2">
          <button class="btn" @click="showConfirm=false">{{$t("Cancel")}}</button>
          <button class="btn btn-primary" @click="confirmLogout">{{$t("Logout")}}</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import {ref} from "vue";

import LanguageSwitcherDropdown from '@/components/LanguageSwitcherDropdown.vue';

const auth = useAuthStore();
const router = useRouter();
const ui = useUiStore();

const showConfirm = ref(false);
function logout() { showConfirm.value = true; }
function confirmLogout() {
  auth.logout();
  router.push({name: 'landing'})
}
</script>
