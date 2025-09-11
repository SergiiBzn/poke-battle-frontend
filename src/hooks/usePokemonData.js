import { useState, useEffect } from "react";
import pLimit from "p-limit";
export const usePokemons = () => {
  const pokeNum = 250;
  const pokeURL = `https://pokeapi.co/api/v2/pokemon?limit=${pokeNum}`;
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [maxStats, setMaxStats] = useState({
    HP: 0,
    Attack: 0,
    Defense: 0,
    Speed: 0,
  });
  const limit = pLimit(5);
  const fetchPokemonDetails = async (pokemon, controller) => {
    const { url, name } = pokemon;
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        setError(`Failed to fetch details for ${name}`);
        return null;
      }
      return await res.json();
    } catch (error) {
      if (error.name === "AbortError") {
        console.info("fetch aborted");
      } else {
        setError(`Failed to fetch details for ${name}`);
      }
      return null;
    }
  };
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
          return limit(() => {
            return fetchPokemonDetails(pokemon, controller);
          });
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
          const totalStatsPoints = stats.reduce((acc, s) => acc + s.value, 0);
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
            totalStatsPoints,
          };
        });
        if (optimalPokemons.length >= pokeNum) {
          const maxHP = Math.max(...optimalPokemons.map((p) => p.HP));
          const maxAttack = Math.max(...optimalPokemons.map((p) => p.Attack));
          const maxDefense = Math.max(...optimalPokemons.map((p) => p.Defense));
          const maxSpeed = Math.max(...optimalPokemons.map((p) => p.Speed));

          setPokemons(optimalPokemons);
          setMaxStats({
            HP: maxHP,
            Attack: maxAttack,
            Defense: maxDefense,
            Speed: maxSpeed,
          });
          setLoading(false);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("fetch aborted");
        } else {
          console.error("Error fetching pokemons:", error);
          setError(error.message);
          setLoading(false);
        }
      }
    };
    fetchPokemons();
    return () => {
      controller.abort();
    };
  }, []);
  return { pokemons, loading, error, maxStats };
};

export const usePokemon = (pokeId) => {
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    if (!pokeId) return;
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        if (!res.ok) throw new Error("failed to get pokemons!");
        const poke = await res.json();
        const types = poke.types.map((t) => t.type.name).join(", ");
        const abilities = poke.abilities.map((a) => a.ability.name).join(", ");
        const stats = poke.stats.map((s) => {
          return { name: s.stat.name, value: s.base_stat };
        });
        const optimalPokemon = {
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

        setPokemon(optimalPokemon);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    fetchPokemon();
  }, [pokeId]);
  return pokemon;
};
