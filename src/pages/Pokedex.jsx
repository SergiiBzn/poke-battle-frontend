import PokeCard from "../components/PokeCard";

import { usePokemons } from "../../hooks/usePokemonData";
const Pokedex = () => {
  const { pokemons, error, loading } = usePokemons();
  return (
    <div className="container my-4 space-y-4 mx-auto">
      <h1 className="text-3xl text-center py-10">Wählen deine Pokemons aus</h1>
      {error && <div>failed to get pokemons</div>}
      {loading && <div>loading</div>}
      {!loading && !error && pokemons.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {pokemons.map((pokemon) => {
            return <PokeCard key={pokemon.name} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
