import { useContext } from "react";
import PokeCard from "../components/PokeCard";

import { PokeContext } from "../contexts/PokeContext";
const Pokedex = () => {
  const { pokemons, error, loading } = useContext(PokeContext);
  return (
    <div className="container my-4 space-y-4 mx-auto">
      <h1 className="text-xl md:text-2xl text-center py-10">
        Wählen deine Pokemons aus
      </h1>
      {error && <div>failed to get pokemons</div>}
      {loading && <div>loading</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
          {pokemons.map((pokemon) => {
            return <PokeCard key={pokemon.name} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
