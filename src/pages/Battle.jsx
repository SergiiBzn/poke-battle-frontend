import { useContext, useState, useEffect } from "react";
import { PokeContext } from "../contexts/PokeContext";
import { FightCard, MyCard, RandomCard, Result } from "../components";
import { BattleContext } from "../contexts/BattleContex";

const Battle = () => {
  const { myPokemons } = useContext(PokeContext);
  const {
    randomTeam,
    setOpenCard,
    matchPairArray,
    myTeam,
    isFighting,
    startAllBattles,
  } = useContext(BattleContext);

  const [buttonLocked, setButtonLocked] = useState(false);
  const readyToFight =
    myTeam.length !== 0 && randomTeam.length === myTeam.length && !isFighting;

  useEffect(() => {
    setButtonLocked(false);
  }, [myTeam]);

  return (
    <div className="grid grid-cols-[250px_1fr_250px] h-[60vh] gap-4 m-4 min-w-[900px]">
      {/* my pokemons */}
      <div className="flex flex-col  items-center rounded-2xl border-2 border-amber-200 overflow-y-auto">
        <div className="font-pokeso w-full text-center p-2 text-amber-200 text-xl tracking-widest">
          Choose Your Team
        </div>
        <div className="flex flex-col w-full items-center px-2 max-h-[calc(60vh-2rem)">
          {myPokemons.map((pokemon) => (
            <MyCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>

      {/* battle area */}
      <div className="flex flex-col items-center ">
        {" "}
        <div className="w-full rounded-2xl border-2 h-[calc(50vh)]  border-red-400 overflow-y-auto">
          {matchPairArray.map((pair, index) => (
            <FightCard
              key={pair[0].id}
              myPoke={pair[0]}
              randomPokemon={pair[1]}
              index={index}
            />
          ))}
        </div>{" "}
        <button
          className="btn btn-xl btn-error rounded-2xl mt-4 "
          disabled={!readyToFight || buttonLocked}
          onClick={() => {
            startAllBattles();
            setOpenCard(true);
            setButtonLocked(true);
          }}
        >
          Fight
        </button>
      </div>

      {/* opponent team */}
      <div className="rounded-2xl border-2 border-accent overflow-y-auto">
        <div className="font-pokeso w-full text-center text-accent p-2 text-xl tracking-widest">
          Your Opponent
        </div>
        <div className="flex flex-col items-center mx-2 max-h-[calc(60vh-2rem)">
          {randomTeam.map((pokemon) => (
            <RandomCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <Result />
    </div>
  );
};

export default Battle;
