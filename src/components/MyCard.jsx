import { useState, useEffect } from "react";
import { useContext } from "react";
import { BattleContext } from "../contexts/BattleContex";

const MyCard = ({ pokemon, winner }) => {
  const { image, name } = pokemon;
  const { editTeam, myTeam } = useContext(BattleContext);

  const [isSelected, setIsSelected] = useState(
    myTeam.some((p) => p.id === pokemon.id)
  );
  useEffect(() => {
    setIsSelected(myTeam.some((p) => p.id === pokemon.id));
  }, [myTeam, pokemon.id]);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
    editTeam(pokemon);
  };

  const isDefeated = winner && winner !== pokemon.name;
  const isWin = winner && winner === pokemon.name;

  return (
    <div
      className={`relative flex items-center bg-blue-400 w-full h-20 rounded-2xl p-2 m-2 border-amber-200 ${
        isSelected ? "border-4" : ""
      }`}
      onClick={() => handleClick()}
    >
      {isDefeated && (
        <div className="absolute inset-0 rounded-2xl bg-gray-500 opacity-80 flex items-center justify-center z-20">
          <span className="text-red-500 font-pokeso text-lg">DEFEATED</span>
        </div>
      )}
      <div className=" avatar w-16 h-16 flex-shrink-0">
        <div className="w-16 h-16 bg-amber-100 rounded-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      </div>
      <div
        className={`flex-1 font-luckiest text-center text-yellow-300 px-2 truncate ${
          isWin ? "scale-125 animate-bounce" : ""
        }`}
      >
        {name}
      </div>
    </div>
  );
};

export default MyCard;
