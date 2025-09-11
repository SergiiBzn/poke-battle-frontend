import { useContext } from "react";
import { PokeContext } from "../contexts/PokeContext";
import { FightCard, MyCard, RandomCard } from "../components";
import { BattleContext } from "../contexts/BattleContex";

const Battle = () => {
  const { myPokemons } = useContext(PokeContext);
  const { randomTeam, setIsFighting, matchPairArray, myTeam, IsFighting } =
    useContext(BattleContext);

  const readyToFight =
    myTeam.length !== 0 && randomTeam.length === myTeam.length && !IsFighting;

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] h-[60vh] gap-4 m-4">
      <div className=" rounded-2xl border-2  border-amber-200 overflow-y-auto">
        <div className="flex flex-col items-center">
          {myPokemons.map((pokemon) => (
            <MyCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="w-full rounded-2xl border-2 h-4/5 border-red-400 overflow-y-auto">
          {matchPairArray.map((pair) => (
            <FightCard
              key={pair[0].id}
              myPoke={pair[0]}
              randomPokemon={pair[1]}
            />
          ))}
        </div>
        <button
          className="btn btn-xl btn-error mt-4"
          disabled={!readyToFight}
          onClick={() => {
            setIsFighting(true);
          }}
        >
          Fight
        </button>
      </div>
      <div className="rounded-2xl border-2 border-blue-300 overflow-y-auto">
        <div className="flex flex-col items-center">
          {randomTeam.map((pokemon) => (
            // <MyCard key={pokemon.name} pokemon={pokemon} />
            <RandomCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Battle;
