<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-semibold">{{$t("AboutGame")}}</h2>
    <p class="text-zinc-300">
      {{$t("GameDescription.Description")}}
    </p>

    <ul class="grid sm:grid-cols-2 gap-3">
      <li class="card">✅ {{$t("GameDescription.Card1")}}</li>
      <li class="card">🗡️ {{$t("GameDescription.Card2")}}</li>
      <li class="card">🏰 {{$t("GameDescription.Card3")}}</li>
      <li class="card">🛠️ {{$t("GameDescription.Card4")}}</li>
      <li class="card">🪙 {{$t("GameDescription.Card5")}}</li>
      <li class="card">🔁 {{$t("GameDescription.Card6")}}</li>
    </ul>
  </div>
</template>