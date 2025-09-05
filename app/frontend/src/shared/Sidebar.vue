<template>
  <div class="px-2 py-3">
    <template v-for="group in MENU_GROUPS" :key="group.title ?? group.items[0].path">
      <p v-if="group.title" class="px-3 pt-4 pb-2 text-xs uppercase tracking-wide text-zinc-500">
        {{ group.title }}
      </p>

      <ul class="space-y-0.5">
        <li v-for="m in group.items" :key="m.path">
          <RouterLink
              :to="m.path"
              class="group flex items-center gap-3 px-3 py-1.5 rounded-sm text-zinc-300 hover:text-white
                   border-l-2 transition"
              :class="isActive(m.path)
              ? 'bg-zinc-800/60 border-indigo-500'
              : 'border-transparent hover:bg-zinc-800/40'">
            <component :is="m.icon" class="inline-block w-[1em] h-[1em] text-zinc-300 group-hover:text-white" aria-hidden="true"/>
            <span class="truncate">{{ m.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { MENU_GROUPS } from '@/config/menu';

const route = useRoute();
const isActive = (p: string) => route.path === p || route.path.startsWith(p + '/');
</script>