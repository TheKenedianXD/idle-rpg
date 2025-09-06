<template>
  <div class="w-full max-w-md space-y-6">
    <div>
      <h1 class="text-3xl font-semibold">{{$t("app.brand")}}</h1>
      <p class="text-zinc-400">{{$t("LoginOrCreateAccountToStartTheGrind")}}!</p>
    </div>

    <div class="flex gap-2">
      <button class="btn" :class="tab==='login' ? '' : 'opacity-60'" @click="tab='login'">{{$t("Login")}}</button>
      <button class="btn" :class="tab==='register' ? '' : 'opacity-60'" @click="tab='register'">{{$t("RegisterIn")}}</button>
    </div>

    <form class="card space-y-4" @submit.prevent="submit">
      <div>
        <label class="block mb-1 text-sm text-zinc-400">{{$t("Nickname")}}</label>
        <input class="input" v-model="name" :placeholder="t('Nickname')" />
      </div>
      <div>
        <label class="block mb-1 text-sm text-zinc-400">{{$t("Password")}}</label>
        <input class="input" v-model="password" type="password" placeholder="••••••••" />
      </div>
      <button class="btn w-full" type="submit">{{ tab === 'login' ? $t("Login") : $t("CreateAccount") }}</button>
    </form>

    <div class="flex items-center justify-between text-sm text-zinc-500">
      <p>
        {{$t("ByContinuingYouAgreeTo")}}
        <RouterLink :to="lr({ path: '#' })" class="link">{{$t('TOS')}}</RouterLink>.
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