<template>
  <div class="min-h-screen grid lg:grid-cols-2">
    <section class="p-6 lg:p-10 flex items-center justify-center border-b border-zinc-800 lg:border-b-0 lg:border-r">
      <AuthPanel />
    </section>

    <section class="p-6 lg:p-10 flex items-center">
      <GameInfo />
    </section>
  </div>
</template>

<script setup lang="ts">
import AuthPanel from '@/sections/AuthPanel.vue';
import GameInfo from '@/sections/GameInfo.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const auth = useAuthStore();
onMounted(() => {
  // auth.loginMock('DevHero');
});
</script>
