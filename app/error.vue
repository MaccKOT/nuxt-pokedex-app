<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error.statusCode === 404);

const heading = computed(() =>
  isNotFound.value ? "Page not found" : "Something went wrong",
);

// Show the upstream message only when it adds info beyond the heading.
// Case-insensitive check avoids duplicating Nuxt's default "Page Not Found".
const detail = computed(() => {
  const msg = props.error.statusMessage ?? props.error.message;
  if (!msg || msg.toLowerCase() === heading.value.toLowerCase())
    return undefined;
  return msg;
});

const fallbackText = computed(() =>
  isNotFound.value
    ? "This page could not be found — it may have wandered off into the tall grass."
    : "An unexpected error occurred while loading this page.",
);

useHead({ title: `${props.error.statusCode} — ${heading.value}` });

// Keep error responses out of search indexes.
useSeoMeta({ robots: "noindex, nofollow" });

const goHome = () => clearError({ redirect: "/" });
const retry = () => window.location.reload();
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-ink"
  >
    <!-- Same shell as PokemonCard: border-line, surface-card, rounded-xl, shadow-sm -->
    <div
      class="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl border border-line bg-surface-card p-6 text-center shadow-sm"
    >
      <span class="text-5xl font-black leading-none text-brand">
        {{ error.statusCode }}
      </span>

      <!-- Matches the pokemon name style in PokemonCard -->
      <h1 class="text-xl font-semibold uppercase">
        {{ heading }}
      </h1>

      <p class="text-ink-muted">
        {{ detail ?? fallbackText }}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-2">
        <!-- Primary: identical to the "Back to list" link on the detail page -->
        <button
          type="button"
          class="rounded-lg px-4 py-2 font-semibold text-brand transition-colors hover:bg-brand/10"
          @click="goHome"
        >
          Go home
        </button>

        <!-- Secondary: no border either, muted so the pair reads as primary/secondary -->
        <button
          v-if="!isNotFound"
          type="button"
          class="rounded-lg px-4 py-2 font-medium text-ink-muted transition-colors hover:bg-line/50"
          @click="retry"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
</template>
