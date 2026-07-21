<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const { data: pokemon, status, error } = await usePokemonById(id);

if (error.value || !pokemon.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Pokemon #${id} not found`,
  });
}

useHead({ title: `Pokedex — ${pokemon.value.name}` });
</script>

<template>
  <div class="flex flex-col items-center">
    <template v-if="status === 'pending'">
      <div class="h-48 w-48 animate-pulse rounded-full bg-line" />
      <div class="mt-4 h-8 w-40 animate-pulse rounded bg-line" />
    </template>

    <template v-else-if="pokemon">
      <h1 class="my-8 text-center text-4xl font-bold uppercase text-brand">
        {{ pokemon.name }}
      </h1>

      <div class="mb-6 flex flex-wrap items-center justify-center gap-2">
        <span
          v-for="t in pokemon.types"
          :key="t.type.name"
          class="rounded-full border border-line bg-surface-card px-3 py-1 text-sm font-medium capitalize text-ink"
        >
          {{ t.type.name }}
        </span>
      </div>

      <img
        :src="pokemon.sprites.front_default ?? undefined"
        :alt="pokemon.name"
        width="200"
        height="200"
        class="h-48 w-48"
      />

      <div
        class="mt-6 grid w-full max-w-sm grid-cols-2 gap-4 rounded-xl border border-line bg-surface-card p-6"
      >
        <div>
          <p class="text-sm text-ink-muted">Height</p>
          <p class="text-lg font-semibold text-ink">
            {{ pokemon.height / 10 }} m
          </p>
        </div>
        <div>
          <p class="text-sm text-ink-muted">Weight</p>
          <p class="text-lg font-semibold text-ink">
            {{ pokemon.weight / 10 }} kg
          </p>
        </div>
      </div>

      <NuxtLink
        to="/"
        class="mt-6 rounded-lg px-4 py-2 text-brand transition-colors hover:bg-brand/10"
      >
        ← Back to list
      </NuxtLink>
    </template>
  </div>
</template>
