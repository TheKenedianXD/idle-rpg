<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-6 lg:flex-row">
      <!-- LEFT -->
      <div class="flex-1 flex flex-col gap-6">
        <!-- PLAYER CARD -->
        <section class="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
          <header class="flex flex-col items-start mb-3 gap-1 lg:flex-row lg:items-start lg:justify-between">
            <h2 class="text-xl font-semibold">JohnnyMachete</h2>

            <div class="flex flex-col items-start text-left
              lg:items-end lg:text-right">
              <span class="text-zinc-400">{{$t("Level")}} 107</span>
              <span class="text-zinc-500 text-sm">Ascend 1</span>
            </div>
          </header>

          <!-- Level -->
          <div class="space-y-2">
            <span class="text-sm font-medium text-violet-500"><StarIcon class="inline-block w-[1.2em] h-[1.2em]" aria-hidden="true"/>{{$t("Experience")}}</span>
            <ProgressBar :min="0" :max="360540" :value="284524" color-class="bg-violet-500"/>
          </div>

          <!-- Stats -->
          <div class="mt-4 flex text-zinc-300">
            <div class="flex-1 text-center">
              <div class="text-sm text-yellow-500"><TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{$t("Gold")}}</div>
              <div>2 391</div>
            </div>

            <div class="flex-1 text-center">
              <div class="text-sm text-cyan-500"><SoulIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{$t("Essence")}}</div>
              <div>23</div>
            </div>

            <div class="flex-1 text-center">
              <div class="text-sm text-red-500"><DeathJuiceIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> {{$t("Fame")}}</div>
              <div>7 254</div>
            </div>
          </div>
        </section>

        <!-- CURRENT ACTIVITY -->
        <section class="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 class="text-2xl font-semibold mb-3">{{$t("CurrentActivity")}}</h2>

          <div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
            <div class="flex items-center justify-between">
              <div>
                <span><TiedScrollIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("Mission")}}: </span>
                <span class="text-zinc-300"> {{$t("ScoutTheForest")}}</span>
              </div>
              <div class="flex items-center gap-2 text-zinc-300">
                <span><TimeIcon class="inline-block w-[1.2em] h-[1.2em]" aria-hidden="true"/>24:51</span>
              </div>
            </div>

            <div class="mt-4">
              <div class="text-sm text-zinc-500 mb-1">{{$t("Progress")}}</div>
              <div class="flex items-center gap-3 text-zinc-300">
                <ProgressBar class="mt-2" :min="0" :max="1800" :value="1491" :show-label="false" :show-min-max="false" :show-value="false" color-class="bg-amber-500"/>
              </div>
            </div>

            <div class="mt-4">
              <div class="text-sm text-zinc-500 mb-1">{{$t("Reward")}}</div>
              <div class="flex items-center gap-3 text-zinc-300">
                <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-yellow-500"><TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 5</span>
                <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-violet-500"><StarIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 15</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- RIGHT (QUESTS) -->
      <aside class="lg:w-[380px] rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
        <h2 class="text-2xl font-semibold mb-4">{{$t("Quests")}}</h2>

        <div class="space-y-6">
          <!-- Daily Quests -->
          <div>
            <div class="mb-2 font-medium text-zinc-300">{{$t("DailyQuests")}}</div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span><TiedScrollIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("CompleteXMissions", { count:5 })}}</span>
              </div>
              <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-yellow-500"><TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 100</span>
            </div>
            <ProgressBar class="mt-2" :min="0" :max="4" :value="3" />
          </div>

          <div>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span><SwordClashIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("WinXPvPBattles", {count: 1})}}</span>
              </div>
              <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-violet-500"><StarIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 75</span>
            </div>
            <ProgressBar class="mt-2" :min="0" :max="1" :value="0" />
          </div>

          <!-- Tutorials -->
          <div class="space-y-4">
            <div class="font-medium text-zinc-300">{{$t("BeginnersQuests")}}</div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span><ShopIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("VisitTheShop")}}</span>
              </div>
              <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-yellow-500"><TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 5</span>
            </div>

            <div>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <span><PickaxeIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("ToGather")}} 5x {{$t("OakWood")}}</span>
                </div>
                <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-yellow-500"><TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 35</span>
              </div>
              <ProgressBar class="mt-2" :min="0" :max="5" :value="3" />
            </div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span><CharacterIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("UpgradeYourWeapon")}}</span>
              </div>
              <span class="inline-flex space-x-2">
                <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-yellow-500"><TwoCoinsIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 5</span>
                <span class="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-sm text-violet-500"><StarIcon class="inline-block w-[1.5em] h-[1.5em]" aria-hidden="true"/> 5</span>
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!--ACTIVITY LOG-->
    <section class="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
      <h2 class="text-2xl font-semibold mb-3">{{$t("ActivityLog")}}</h2>
      <ul class="space-y-2 text-zinc-200">
        <li class="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm">
          <span><PickaxeIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("YouGathered")}} 5x {{$t("IronOre")}}</span>
          <span class="text-zinc-500 text-right sm:ml-4">14:14:33</span>
        </li>

        <li class="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm">
          <span><TiedScrollIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("YouCompletedMission")}}: {{$t("SearchTheCave")}}</span>
          <span class="text-zinc-500 text-right sm:ml-4">9:38:42</span>
        </li>

        <li class="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm">
          <span><SwordClashIcon class="inline-block w-[1.3em] h-[1.3em]" aria-hidden="true"/> {{$t("YouLostPvPMatchAgainst")}}: DarthSnoob47</span>
          <span class="text-zinc-500 text-right sm:ml-4">0:57:11</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import ProgressBar from '@/components/ui/ProgressBar.vue'

import TwoCoinsIcon from '@/assets/icons/resources/two-coins.svg';
import SoulIcon from '@/assets/icons/resources/soul.svg';
import DeathJuiceIcon from '@/assets/icons/resources/death-juice.svg';
import StarIcon from '@/assets/icons/resources/star.svg';
import TimeIcon from '@/assets/icons/resources/time.svg';
import CharacterIcon from '@/assets/icons/menu/character.svg';
import PickaxeIcon from '@/assets/icons/menu/pickaxe.svg';
import ShopIcon from '@/assets/icons/menu/shop.svg';
import SwordClashIcon from '@/assets/icons/menu/sword-clash.svg';
import TiedScrollIcon from '@/assets/icons/menu/tied-scroll.svg';
</script>
