<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import LanguageSwitcherDropdown from '@/components/LanguageSwitcherDropdown.vue';
import { useLocaleRoute } from '@/composables/useLocaleRoute';

const tab = ref<'login' | 'register'>('login');
const name = ref(''); const password = ref('');
const auth = useAuthStore();
const router = useRouter();
const lr = useLocaleRoute();

function submit() {
  if (tab.value === 'login') auth.loginMock(name.value.trim() || 'PLAYER_NAME');
  else auth.registerMock(name.value.trim() || 'NEW_PLAYER');

  router.push(lr({ name: 'dashboard' }));
}
</script>

<template>
  <div class="w-full max-w-md space-y-6">
    <div>
      <h1 class="text-3xl font-semibold">Idle RPG</h1>
      <p class="text-zinc-400">Přihlas se nebo si založ účet a začni grindit!</p>
    </div>

    <div class="flex gap-2">
      <button class="btn" :class="tab==='login' ? '' : 'opacity-60'" @click="tab='login'">Login</button>
      <button class="btn" :class="tab==='register' ? '' : 'opacity-60'" @click="tab='register'">Register</button>
    </div>

    <form class="card space-y-4" @submit.prevent="submit">
      <div>
        <label class="block mb-1 text-sm text-zinc-400">Nickname</label>
        <input class="input" v-model="name" placeholder="PLAYER_NAME" />
      </div>
      <div>
        <label class="block mb-1 text-sm text-zinc-400">Password</label>
        <input class="input" v-model="password" type="password" placeholder="••••••••" />
      </div>
      <button class="btn w-full" type="submit">{{ tab === 'login' ? 'Login' : 'Create account' }}</button>
    </form>

    <div class="flex items-center justify-between text-sm text-zinc-500">
      <p>
        Pokračováním souhlasíš s
        <RouterLink :to="lr({ path: '/tos' })" class="link"> TOS</RouterLink>.
      </p>
      <LanguageSwitcherDropdown />
    </div>
  </div>
</template>