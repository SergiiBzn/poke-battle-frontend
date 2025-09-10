import { useParams, Link } from "react-router";
import { usePokemons, usePokemon } from "../hooks/usePokemonData";

import { Pokeball } from "../components";

const PokeDetails = () => {
  const { maxStats } = usePokemons();

  const { id } = useParams();
  const pokemon = usePokemon(id);

  if (!pokemon)
    return (
      <Link to="/">
        <figure>
          <img
            src="https://wallpapercave.com/wp/wp2418565.png"
            alt="404 not found"
          />
        </figure>
      </Link>
    );

  return (
    <div className="container max-w-2xl bg-white rounded-3xl p-4 mx-auto my-10">
      <div>
        <div className=" text-yellow-900 flex justify-center items-center my-4 gap-16">
          <span className="transform transition hover:animate-bounce">
            <Pokeball pokemon={pokemon} />
          </span>
          <span className="text-center font-luckiest text-4xl">
            {pokemon.name}
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-16 my-8">
        <div>
          <figure>
            <img src={pokemon.image} alt={pokemon.name} className="h-60" />
          </figure>
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-black space-y-2">
            <div>
              <span className="font-bold ">Type:</span> {pokemon.types}
            </div>
            <div>
              <span className="font-bold">Abilities: </span>
              {pokemon.abilities}
            </div>
          </div>
          <div className="flex flex-col mx-auto justify-center space-y-2">
            <div className="join join-vertical">
              <div className="join-item text-secondary font-bold">
                HP: {pokemon.HP}
              </div>
              <div
                className="join-item tooltip tooltip-right tooltip-secondary"
                data-tip={`Max: ${maxStats.HP}`}
              >
                <progress
                  className="join-item progress progress-secondary w-56"
                  value={pokemon.HP}
                  max={maxStats.HP}
                ></progress>
              </div>
            </div>

            <div className="join join-vertical">
              <div className="join-item text-primary font-bold">
                Attack: {pokemon.Attack}
              </div>
              <div
                className="join-item tooltip tooltip-right tooltip-primary"
                data-tip={`Max: ${maxStats.Attack}`}
              >
                <progress
                  className="join-item progress progress-primary w-56"
                  value={pokemon.Attack}
                  max={maxStats.Attack}
                ></progress>
              </div>
            </div>

            <div className="join join-vertical">
              <div className="join-item text-warning font-bold">
                Defense: {pokemon.Defense}
              </div>
              <div
                className="join-item tooltip tooltip-right tooltip-warning"
                data-tip={`Max: ${maxStats.Defense}`}
              >
                <progress
                  className="join-item progress progress-warning w-56"
                  value={pokemon.Defense}
                  max={maxStats.Defense}
                ></progress>
              </div>
            </div>

            <div className="join join-vertical">
              <div className="join-item text-success font-bold">
                Speed: {pokemon.Speed}
              </div>
              <div
                className="join-item tooltip tooltip-right tooltip-success"
                data-tip={`Max: ${maxStats.Speed}`}
              >
                <progress
                  className=" progress progress-success w-56"
                  value={pokemon.Speed}
                  max={maxStats.Speed}
                ></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PokeDetails;
