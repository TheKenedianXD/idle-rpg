<template>
  <div class="w-full max-w-md space-y-6">
    <div>
      <h1 class="text-3xl font-semibold">{{$t("app.brand")}}</h1>
      <p class="text-zinc-400">{{$t("common.loginOrRegister")}}!</p>
    </div>

    <div class="flex gap-2">
      <button class="btn cursor-pointer" :class="tab==='login' ? '' : 'opacity-60'" @click="tab='login'">{{$t("common.login")}}</button>
      <button class="btn cursor-pointer" :class="tab==='register' ? '' : 'opacity-60'" @click="tab='register'">{{$t("common.register")}}</button>
    </div>

    <form class="card space-y-4" @submit.prevent="submit">
      <div>
        <label class="block mb-1 text-sm text-zinc-400">{{$t("common.nickname")}}</label>
        <input class="input" v-model="name" :placeholder="t('common.nickname')" />
      </div>
      <div>
        <label class="block mb-1 text-sm text-zinc-400">{{$t("common.password")}}</label>
        <input class="input" v-model="password" type="password" placeholder="••••••••" />
      </div>
      <button class="btn w-full cursor-pointer" type="submit">{{ tab === 'login' ? $t("common.login") : $t("common.createAccount") }}</button>
    </form>

    <div class="flex items-center justify-between text-sm text-zinc-500">
      <p>
        {{$t("common.byContinuingYouAgreeTo")}}
        <RouterLink :to="lr({ path: '#' })" class="link">{{$t('common.tos')}}</RouterLink>.
      </p>
      <LanguageSwitcherDropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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
