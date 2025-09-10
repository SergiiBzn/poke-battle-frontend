import { useState, useEffect } from "react";
export const usePokemons = () => {
  const pokeURL = "https://pokeapi.co/api/v2/pokemon?limit=20";
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [maxStats, setMaxStats] = useState({
    HP: 0,
    Attack: 0,
    Defense: 0,
    Speed: 0,
  });

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
