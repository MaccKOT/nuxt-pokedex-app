<script setup lang="ts">
interface Props {
  pokemon: {
    id: number;
    name: string;
    image: string;
  };
}

const { pokemon } = defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="`/pokemon/${pokemon.id}`"
    class="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface-card p-6 text-ink shadow-sm transition-shadow hover:shadow-md"
  >
    <img
      :src="pokemon.image"
      :alt="pokemon.name"
      width="160"
      height="160"
      loading="lazy"
      class="h-40 w-40"
    />
    <span class="text-xl font-semibold uppercase">
      <span class="text-ink-muted">{{ pokemon.id }}.</span>
      {{ pokemon.name }}
    </span>
  </NuxtLink>
</template>
