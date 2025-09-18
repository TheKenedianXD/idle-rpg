<template>
  <div class="px-2 py-3">
    <template v-for="group in MENU_GROUPS" :key="group.titleKey ?? group.items[0].pathName">
      <p
          v-if="group.titleKey"
          class="px-3 pt-4 pb-2 text-xs uppercase tracking-wide text-zinc-500"
      >
        {{ $t(group.titleKey) }}
      </p>

      <ul class="space-y-0.5">
        <li v-for="item in group.items" :key="item.pathName">
          <RouterLink
              :to="{ name: item.pathName }"
              class="group flex items-center justify-between gap-3 px-3 py-1.5 rounded-sm text-zinc-300 border-l-2 transition"
              :class="activeChecker(item.pathName)
              ? 'bg-zinc-800/60 border-indigo-500 text-white'
              : 'border-transparent hover:bg-zinc-800/40 hover:text-white'">

            <div class="flex items-center gap-3">
              <component
                  :is="item.icon"
                  class="inline-block w-[1em] h-[1em] text-zinc-300 group-hover:text-white"
              />
              <span class="truncate">{{ $t(item.labelKey) }}</span>
            </div>

            <TimeIcon
                v-if="item.activeTask"
                class="inline-block w-[1em] h-[1em] text-zinc-300 group-hover:text-white"
            />
          </RouterLink>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MENU_GROUPS } from '@/config/menu'
import TimeIcon from '@/assets/icons/resources/time.svg'

const route = useRoute()

const activeChecker = (name: string) => computed(() => route.name === name).value
</script>
