<template>
  <div class="min-h-screen">
    <Navbar />

    <div class="flex">
      <aside
          class="hidden lg:block w-[260px] shrink-0 border-r border-zinc-800 p-3 lg:p-4
               sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <Sidebar />
      </aside>

      <main class="flex-1 min-w-0 p-4 lg:p-6">
        <RouterView v-slot="{ Component }">
          <KeepAlive include="DashboardPage">
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </main>
    </div>

    <Teleport to="body">
      <transition name="fade">
        <div
            v-show="ui.sidebarOpen"
            class="fixed inset-0 z-40 bg-black/60"
            @click="ui.close()"
        />
      </transition>

      <transition name="slide">
        <aside
            v-show="ui.sidebarOpen"
            class="fixed inset-y-0 left-0 z-50 w-[80%] max-w-[320px]
           bg-zinc-950 border-r border-zinc-800 p-3 flex flex-col lg:hidden"
            @keyup.esc="ui.close()"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="text-lg font-semibold">Menu</div>
            <button class="p-2 rounded-md hover:bg-zinc-800" @click="ui.close()" aria-label="Close menu">
              <svg viewBox="0 0 24 24" class="w-6 h-6" fill="currentColor">
                <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z"/>
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto">
            <Sidebar />
          </div>

          <div class="border-t border-zinc-800 pt-3 mt-3 space-y-2 text-sm">
            <a class="block text-zinc-300 text-center hover:text-indigo-400" href="#">{{$t("TOS")}}</a>
            <a class="block text-zinc-300 text-center hover:text-indigo-400" href="#">Discord</a>
            <a class="block text-zinc-300 text-center hover:text-indigo-400" href="#">{{$t("Changelog")}}</a>
          </div>
        </aside>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/shared/Navbar.vue';
import Sidebar from '@/shared/Sidebar.vue';
import { useUiStore } from '@/stores/ui';
import { watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const ui = useUiStore();
const router = useRouter();

router.afterEach(() => ui.close());

// lock scroll při otevřeném draweru
watch(() => ui.sidebarOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : '';
});
onUnmounted(() => { document.documentElement.style.overflow = ''; });
</script>

<style>
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
.slide-enter-active, .slide-leave-active { transition: transform .2s ease-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
</style>
