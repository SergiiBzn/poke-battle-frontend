import { useContext } from "react";
import { PokeContext } from "../contexts/PokeContext";
import { PokeCard } from "../components";
import { Link } from "react-router";

const MyParty = () => {
  const { myPokemons } = useContext(PokeContext);

  return (
    <div className="container my-4 space-y-4 mx-auto">
      {myPokemons.length > 0 && (
        <h1 className="text-xl text-center py-4 font-pokeso tracking-widest text-orange-400">
          Hier ist your Team !
        </h1>
      )}
      {!myPokemons.length && (
        <div className="text-xl text-center py-4 font-pokeso tracking-widest text-orange-400">
          Bitte wählen Sie Pokemons{" "}
          <Link to="/" className="link link-info">
            hier
          </Link>{" "}
          aus !
        </div>
      )}
      <div className="max-h-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {myPokemons.map((pokemon) => {
          return <PokeCard key={pokemon.name} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
};

export default MyParty;
