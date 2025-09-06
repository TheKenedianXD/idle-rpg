<template>
  <div class="px-2 py-3">
    <template v-for="group in MENU_GROUPS" :key="group.titleKey ?? group.items[0].pathName">
      <p v-if="group.titleKey" class="px-3 pt-4 pb-2 text-xs uppercase tracking-wide text-zinc-500">
        {{ $t(group.titleKey) }}
      </p>

      <ul class="space-y-0.5">
        <li v-for="m in group.items" :key="m.pathName">
          <RouterLink
              :to="m.pathName"
              class="group flex items-center gap-3 px-3 py-1.5 rounded-sm text-zinc-300 hover:text-white
                   border-l-2 transition"
              :class="isActive(m.pathName)
              ? 'bg-zinc-800/60 border-indigo-500'
              : 'border-transparent hover:bg-zinc-800/40'">
            <component :is="m.icon" class="inline-block w-[1em] h-[1em] text-zinc-300 group-hover:text-white" aria-hidden="true"/>
            <span class="truncate">{{ $t(m.labelKey) }}</span>
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
const isActive = (name: string) => route.name === name;
</script>