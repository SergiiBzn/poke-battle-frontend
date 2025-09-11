import { useContext, useState } from "react";
import { BattleContext } from "../contexts/BattleContex";
import MyCard from "./MyCard";
import RandomCard from "./RandomCard";

const FightCard = ({ myPoke, randomPokemon }) => {
  const { IsFighting, setIsFighting } = useContext(BattleContext);
  // const [isWin, setIstWin] = useState(false);
  if (IsFighting) {
    checkWin();
    setTimeout(() => {
      setIsFighting(false);
    }, 3000);
  }
  const checkWin = () => {
    console.log(IsFighting);
  };

  return (
    <div className="w-full grid grid-cols-[2fr_1fr_2fr] items-center p-2 ">
      <div className="flex justify-center">
        <MyCard pokemon={myPoke} />
      </div>
      <div className="flex justify-center font-extrabold font-pokeso text-yellow-300">
        V S
      </div>
      <div className="flex justify-center">
        <RandomCard pokemon={randomPokemon} />
      </div>
    </div>
  );
};

export default FightCard;
