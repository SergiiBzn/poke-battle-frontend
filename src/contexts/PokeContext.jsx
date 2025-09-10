import { createContext, useEffect, useState } from "react";
import { usePokemons } from "../hooks/usePokemonData";

export const PokeContext = createContext();

const PokeContextProvider = ({ children }) => {
  const { pokemons, loading, error, maxStats } = usePokemons();
  const [myPokemons, setMyPokemons] = useState(
    JSON.parse(localStorage.getItem("myPokemons")) || []
  );
  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  }, [myPokemons]);

  const isCaught = (pokemon) => {
    return myPokemons.some((p) => p.id === pokemon.id);
  };

  const catchPokemon = (pokemon) => {
    if (!myPokemons.some((p) => p.id === pokemon.id)) {
      setMyPokemons((prev) => [...prev, pokemon]);
    }
  };
  const releasePokemon = (pokemon) => {
    setMyPokemons((prev) => prev.filter((p) => p.id !== pokemon.id));
  };

  const handleCatch = (pokemon) => {
    if (isCaught(pokemon)) {
      releasePokemon(pokemon);
    } else {
      catchPokemon(pokemon);
    }
  };

  return (
    <PokeContext
      value={{
        pokemons,
        loading,
        error,
        maxStats,
        myPokemons,
        isCaught,
        handleCatch,
      }}
    >
      {children}
    </PokeContext>
  );
};
export default PokeContextProvider;
