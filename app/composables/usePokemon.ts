// Typed interfaces for PokeAPI responses
interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string | null };
}

const POKEAPI_BASE = "https://pokeapi.co/api/v2";
const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

// Fetch first 150 pokemon (SSR-safe, auto-deduped)
export const usePokemonList = () => {
  return useFetch<{ results: Array<{ name: string; url: string }> }>(
    `${POKEAPI_BASE}/pokemon`,
    {
      query: { limit: 150 },
      transform: (raw): PokemonListItem[] =>
        raw.results.map((item, i) => ({
          id: i + 1,
          name: item.name,
          image: `${SPRITE_BASE}/${i + 1}.png`,
        })),
    },
  );
};

// Fetch single pokemon by id
export const usePokemonById = (id: string | number) => {
  return useFetch<PokemonDetail>(`${POKEAPI_BASE}/pokemon/${id}`);
};
