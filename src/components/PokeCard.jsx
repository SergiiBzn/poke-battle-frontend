import Pokeball from "./Pokeball";
import { Link } from "react-router";
import { useContext } from "react";
import { PokeContext } from "../contexts/PokeContext";

const PokeCard = ({ pokemon }) => {
  const { maxStats } = useContext(PokeContext);

  return (
    <Link
      to={`/pokemons/${pokemon.id}`}
      className="group  h-60 w-full sm:h-80  [perspective:1000px]"
    >
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* vorwarts */}
        <div className="absolute inset-0 bg-white shadow-md rounded-xl flex flex-col items-center justify-center [backface-visibility:hidden]">
          <figure>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="h-40 sm:h-48 md:h-56 lg:h-60 object-contain mx-auto"
            />
          </figure>
          <div className=" text-yellow-900 flex justify-center items-center my-4 gap-4">
            <div>
              <Pokeball pokemon={pokemon} />
            </div>
            <div className="text-center font-luckiest text-2xl">
              {pokemon.name}
            </div>
          </div>
        </div>

        {/* rückwarts */}
        <div className="absolute inset-0 bg-yellow-100  text-yellow-900 shadow-md rounded-xl flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] p-2 sm:p-4">
          <div className="w-full h-60 flex flex-col justify-center space-y-8 p-2">
            {/* Types and Abilities */}
            <div className="text-black space-y-2">
              <div className=" line-clamp-1 overflow-hidden">
                <span className="font-bold ">Type:</span> {pokemon.types}
              </div>
              <div className=" line-clamp-1 overflow-hidden">
                <span className="font-bold">Abilities: </span>
                {pokemon.abilities}
              </div>
            </div>

            {/* stats */}
            <div className="flex flex-col justify-center space-y-2">
              <div className="flex items-center space-x-4 ">
                <progress
                  className="progress progress-secondary"
                  value={pokemon.HP}
                  max={maxStats.HP}
                ></progress>
              </div>

              <div className="flex items-center space-x-4">
                <progress
                  className="progress progress-primary"
                  value={pokemon.Attack}
                  max={maxStats.Attack}
                ></progress>
              </div>

              <div className="flex items-center space-x-4">
                <progress
                  className="progress progress-warning"
                  value={pokemon.Defense}
                  max={maxStats.Defense}
                ></progress>
              </div>

              <div className="flex items-center space-x-4">
                <progress
                  className="progress progress-success"
                  value={pokemon.Speed}
                  max={maxStats.Speed}
                ></progress>
              </div>
            </div>
          </div>
          <div className=" text-yellow-900 flex justify-center items-center my-4 gap-4">
            <span>
              <Pokeball pokemon={pokemon} />
            </span>
            <span className="text-center font-luckiest text-2xl">
              {pokemon.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokeCard;
