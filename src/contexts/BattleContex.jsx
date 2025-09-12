import { createContext, useContext, useState } from "react";
import { PokeContext } from "./PokeContext";

export const BattleContext = createContext();

const BattleContexProvider = ({ children }) => {
  const { pokemons, myPokemons } = useContext(PokeContext);
  const [myTeam, setMyTeam] = useState([]);
  const [randomTeam, setRandomTeam] = useState([]);
  const [matchPairArray, setmatchPairArray] = useState([]);
  const [openCard, setOpenCard] = useState(false);
  const [score, setScore] = useState(0);
  const [isFighting, setIsFighting] = useState(false);

  const [currentBattleIndex, setCurrentBattleIndex] = useState(0);
  const [allBattlesFinished, setAllBattlesFinished] = useState(false);

  const addRandomPokemon = (myPoke) => {
    const restPokemons = pokemons.filter((p) => !myPokemons.includes(p));
    let randomPokemon;
    if (!restPokemons || restPokemons.length === 0) return;

    while (true) {
      const random = Math.floor(Math.random() * restPokemons.length);
      randomPokemon = restPokemons[random];
      if (!randomTeam.some((p) => p.id === randomPokemon.id)) {
        setRandomTeam((prev) => [
          ...prev,
          { ...randomPokemon, matchId: myPoke.id },
        ]);
        break;
      }
    }
    return randomPokemon;
  };

  const editTeam = (pokemon) => {
    const exist = myTeam.find((p) => p.id === pokemon.id);

    if (exist) {
      const myTeamUpdated = myTeam.filter((p) => p.id !== pokemon.id);
      setMyTeam(myTeamUpdated);

      const randomTeamUpdated = randomTeam.filter(
        (p) => p.matchId !== pokemon.id
      );
      setRandomTeam(randomTeamUpdated);

      const matchPairArrayUpdated = matchPairArray.filter(
        (m) => m[0].id !== pokemon.id
      );
      setmatchPairArray(matchPairArrayUpdated);
    } else {
      setMyTeam((prev) => [...prev, pokemon]);
      const randomPokemon = addRandomPokemon(pokemon);
      setmatchPairArray((prev) => [...prev, [pokemon, randomPokemon]]);
    }
    //
    resetBattleState();
  };
  const calcScore = (poke1, poke2) => {
    const base = 10;
    const diff = Math.abs(poke1.totalStatsPoints - poke2.totalStatsPoints);
    const bonus = Math.floor(Math.sqrt(diff)) * 3;
    const randomBonus = Math.floor(Math.random() * 10);
    return base + bonus + randomBonus;
  };
  const checkWin = (poke1, poke2) => {
    if (!poke1 || !poke2) return null;

    if (poke1.totalStatsPoints >= poke2.totalStatsPoints) {
      setScore((prev) => prev + calcScore(poke1, poke2));
      return poke1;
    } else {
      return poke2;
    }
  };

  const resetBattleState = () => {
    setCurrentBattleIndex(0);
    setIsFighting(false);
  };

  const resetAllBattles = () => {
    setCurrentBattleIndex(0);
    setIsFighting(false);
    setScore(0);
    setMyTeam([]);
    setRandomTeam([]);
    setmatchPairArray([]);
  };

  const startAllBattles = () => {
    if (matchPairArray.length > 0) {
      setIsFighting(true);
      setAllBattlesFinished(false);
      setCurrentBattleIndex(0);
    }
  };

  const advanceToNextBattle = () => {
    if (currentBattleIndex < matchPairArray.length - 1) {
      setCurrentBattleIndex((prev) => prev + 1);
      return true;
    } else {
      setAllBattlesFinished(true);
      setIsFighting(false);
      return false;
    }
  };

  return (
    <BattleContext
      value={{
        myTeam,
        randomTeam,
        matchPairArray,
        editTeam,
        openCard,
        setOpenCard,
        isFighting,
        setIsFighting,
        score,
        setScore,
        checkWin,
        startAllBattles,
        allBattlesFinished,
        currentBattleIndex,
        setCurrentBattleIndex,
        resetBattleState,
        advanceToNextBattle,
        setAllBattlesFinished,
        resetAllBattles,
      }}
    >
      {children}
    </BattleContext>
  );
};

export default BattleContexProvider;
