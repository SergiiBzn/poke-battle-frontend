import { useContext } from "react";
import { PokeContext } from "../contexts/PokeContext";
import { PokeCard } from "../components";
import { Link } from "react-router";

const MyParty = () => {
  const { myPokemons } = useContext(PokeContext);

  return (
    <div className="container my-4 space-y-4 mx-auto">
      <h1 className="text-xl md:text-2xl text-center py-10">
        Hier ist your Team !
      </h1>
      {!myPokemons.length && (
        <div className="text-xl md:text-2xl text-center">
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
