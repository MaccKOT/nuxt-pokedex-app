// Server-side proxy (optional, mirrors the original SvelteKit API route)
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id || !/^\d+$/.test(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  return await $fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: { maxAge: 600 },
  });
});
