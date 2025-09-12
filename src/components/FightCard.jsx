import { useContext, useEffect, useState } from "react";
import { BattleContext } from "../contexts/BattleContex";
import MyCard from "./MyCard";
import RandomCard from "./RandomCard";

const FightCard = ({ myPoke, randomPokemon, index }) => {
  const {
    isFighting,
    checkWin,
    myTeam,
    setScore,
    currentBattleIndex,
    setAllBattlesFinished,
    advanceToNextBattle,
  } = useContext(BattleContext);
  const [winner, setWinner] = useState(null);
  const [inCombat, setInCombat] = useState(false);

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (!isFighting || index != currentBattleIndex) return;

    const runBattle = async () => {
      setInCombat(true);
      const ms = Math.floor(Math.random() * 2000);
      await sleep(ms);
      const result = checkWin(myPoke, randomPokemon);
      setWinner(result.name);
      console.log("my:", myPoke.totalStatsPoints);
      console.log("random:", randomPokemon.totalStatsPoints);

      const next = advanceToNextBattle();
      if (!next) {
        setAllBattlesFinished(true);
      }
    };

    runBattle();

    return () => {
      setInCombat(false);
    };
  }, [
    isFighting,
    advanceToNextBattle,
    checkWin,
    myPoke,
    randomPokemon,
    setAllBattlesFinished,
    currentBattleIndex,
    index,
  ]);
  useEffect(() => {
    setWinner(null);
    setInCombat(false);
    setScore(0);
  }, [myTeam, setWinner, setInCombat, setScore]);
  return (
    <div className="w-full grid grid-cols-[1fr_150px_1fr] items-center p-1 ">
      <div className="flex justify-center items-center w-full h-full">
        <MyCard pokemon={myPoke} winner={winner} />
      </div>
      <div className="flex flex-col justify-center items-center self-start mt-2 gap-3 px-2 ">
        <div className="w-full text-center tracking-widest font-pokeso text-yellow-300 overflow-hidden">
          {winner ? `${winner} win` : inCombat ? "Fighting" : "VS"}
        </div>
        {inCombat ? (
          <progress className=" progress progress-error w-full"></progress>
        ) : (
          <progress
            className=" progress progress-error w-full"
            value={100}
            max={100}
          ></progress>
        )}
      </div>

      <div className="flex justify-center items-center w-full h-full">
        <RandomCard pokemon={randomPokemon} winner={winner} />
      </div>
    </div>
  );
};

export default FightCard;
