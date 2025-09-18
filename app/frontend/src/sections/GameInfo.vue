<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-semibold">{{$t("common.aboutGame")}}</h2>
    <p class="text-zinc-300">
      {{$t("gameDescription.description")}}
    </p>

    <ul class="grid sm:grid-cols-2 gap-3">
      <li class="card">✅ {{$t("gameDescription.card1")}}</li>
      <li class="card">🗡️ {{$t("gameDescription.card2")}}</li>
      <li class="card">🏰 {{$t("gameDescription.card3")}}</li>
      <li class="card">🛠️ {{$t("gameDescription.card4")}}</li>
      <li class="card">🪙 {{$t("gameDescription.card5")}}</li>
      <li class="card">🔁 {{$t("gameDescription.card6")}}</li>
    </ul>
  </div>
</template>
