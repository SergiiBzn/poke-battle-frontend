import { createContext, useContext, useState } from "react";
import { PokeContext } from "./PokeContext";

export const BattleContext = createContext();

const BattleContexProvider = ({ children }) => {
  const { pokemons } = useContext(PokeContext);
  const [myTeam, setMyTeam] = useState([]);
  const [randomTeam, setRandomTeam] = useState([]);
  const [matchPairArray, setmatchPairArray] = useState([]);

  const [score, setScore] = useState(0);
  const [isFighting, setIsFighting] = useState(false);

  const addRandomPokemon = (myPoke) => {
    let randomPokemon;
    if (!pokemons || pokemons.length === 0) return;

    while (true) {
      const random = Math.floor(Math.random() * pokemons.length);
      randomPokemon = pokemons[random];
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
  };

  return (
    <BattleContext
      value={{
        myTeam,
        randomTeam,
        matchPairArray,
        editTeam,
        isFighting,
        setIsFighting,
        score,
        setScore,
      }}
    >
      {children}
    </BattleContext>
  );
};

export default BattleContexProvider;
