<script setup lang="ts">
const { data: pokemonList, status } = await usePokemonList();

const searchTerm = ref("");

const filtered = computed(() => {
  const list = pokemonList.value ?? [];
  if (!searchTerm.value) return list;
  const term = searchTerm.value.toLowerCase();
  return list.filter((p) => p.name.includes(term));
});

useHead({ title: "Pokedex" });
</script>

<template>
  <div>
    <h1 class="my-8 text-center text-4xl font-bold uppercase text-brand">
      Nuxt Pokedex
    </h1>

    <div class="mx-auto mb-6 max-w-md">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search pokemon..."
        aria-label="Search pokemon"
        class="w-full rounded-lg border border-line bg-surface-card px-4 py-2.5 text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </div>

    <!-- Loading skeleton -->
    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="flex flex-col items-center gap-3 rounded-xl border border-line p-6"
      >
        <div class="h-40 w-40 animate-pulse rounded-full bg-line" />
        <div class="h-5 w-24 animate-pulse rounded bg-line" />
      </div>
    </div>

    <!-- Pokemon grid -->
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <PokemonCard v-for="poke in filtered" :key="poke.id" :pokemon="poke" />
    </div>

    <p
      v-if="status === 'success' && filtered.length === 0"
      class="mt-8 text-center text-ink-muted"
    >
      No pokemon found for "{{ searchTerm }}"
    </p>
  </div>
</template>
