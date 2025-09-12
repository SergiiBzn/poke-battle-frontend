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
    <div className="w-full grid grid-cols-[1fr_1fr_1fr] items-center p-2 ">
      <div className="flex justify-center items-center">
        <MyCard pokemon={myPoke} winner={winner} />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 ">
        <div className="tracking-widest font-pokeso text-yellow-300">
          {winner ? `${winner} win` : inCombat ? "Fighting" : "VS"}
        </div>
        {inCombat ? (
          <progress className=" progress progress-error w-1/2"></progress>
        ) : (
          <progress
            className=" progress progress-error w-1/2"
            value={100}
            max={100}
          ></progress>
        )}
      </div>

      <div className="flex justify-center items-center">
        <RandomCard pokemon={randomPokemon} winner={winner} />
      </div>
    </div>
  );
};

export default FightCard;
