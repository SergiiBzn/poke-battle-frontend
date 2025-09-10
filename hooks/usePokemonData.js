import { useState, useEffect } from "react";
export const usePokemons = () => {
  const pokeURL = "https://pokeapi.co/api/v2/pokemon?limit=10";
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(pokeURL, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("failed to get pokemons!");
        const data = await res.json();
        const pokemonPromises = data.results.map(async (pokemon) => {
          const pokemonRes = await fetch(pokemon.url, {
            signal: controller.signal,
          });
          if (!pokemonRes.ok) {
            throw new Error(`Failed to get details for ${pokemon.name}`);
          }
          return pokemonRes.json();
        });

        const detailedPokemons = await Promise.all(pokemonPromises);

        const optimalPokemons = detailedPokemons.map((poke) => {
          const types = poke.types.map((t) => t.type.name).join(", ");
          const abilities = poke.abilities
            .map((a) => a.ability.name)
            .join(", ");
          const stats = poke.stats.map((s) => {
            return { name: s.stat.name, value: s.base_stat };
          });
          return {
            id: poke.id,
            name: poke.name,
            image: poke.sprites.other["official-artwork"].front_default,
            types,
            abilities,
            HP: stats[0].value,
            Attack: stats[1].value,
            Defense: stats[2].value,
            Speed: stats[5].value,
          };
        });

        setPokemons(optimalPokemons);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("fetch aborted");
        } else {
          console.error("Error fetching pokemons:", error);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
    return () => {
      controller.abort();
    };
  }, []);
  return { pokemons, loading, error };
};

export const usePokemon = (pokeId) => {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    if (!pokeId) return;
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/${pokeId}`);
        if (!res.ok) throw new Error("failed to get pokemons!");
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    fetchPokemon();
  }, [pokeId]);
  return pokemon;
};
