import { useContext } from "react";
import PokeCard from "../components/PokeCard";

import { PokeContext } from "../contexts/PokeContext";
const Pokedex = () => {
  const { pokemons, error, loading } = useContext(PokeContext);
  return (
    <div className="container my-4 space-y-4 mx-auto">
      <h1 className="text-xl text-center py-4 font-pokeso tracking-widest text-orange-400">
        Wählen deine Pokemons aus !
      </h1>
      {error && <div>failed to get pokemons</div>}
      {loading && (
        <div className="flex flex-col justify-center items-center text-secondary gap-4">
          <div className="text-lg">loading</div>
          <div>
            <span className="loading loading-spinner loading-lg "></span>
            <span className="loading loading-spinnerloading-lg "></span>
            <span className="loading loading-spinner loading-lg "></span>
          </div>
        </div>
      )}
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
