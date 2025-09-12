import { useContext } from "react";
import { BattleContext } from "../contexts/BattleContex";

const RandomCard = ({ pokemon, winner }) => {
  const { image, name } = pokemon;
  const { openCard } = useContext(BattleContext);
  const isDefeated = winner && winner !== pokemon.name;
  const isWin = winner && winner === pokemon.name;
  return (
    <div className="relative w-full h-20 m-2 ">
      <div
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: openCard ? "rotateX(180deg)" : "rotateX(0deg)" }}
      >
        {/* vorwarts */}
        <div className="absolute inset-0 flex items-center bg-blue-400 rounded-2xl p-2 border-amber-200 [backface-visibility:hidden]">
          <div className=" avatar w-16 h-16 flex-shrink-0">
            <div className="w-16 h-16 bg-amber-100 rounded-full"></div>
          </div>
          <div className="flex-1 font-luckiest text-center text-yellow-300 px-2">
            ???
          </div>
        </div>
        {/* rückwarts */}
        <div className="absolute inset-0 [transform:rotateX(180deg)] [backface-visibility:hidden]">
          <div
            className={`flex items-center bg-blue-400 rounded-2xl p-2 border-amber-200 `}
          >
            <div className="avatar w-16 h-16 flex-shrink-0">
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
        </div>
      </div>
      {isDefeated && (
        <div className="absolute inset-0  bg-gray-500 opacity-80 flex items-center justify-center rounded-2xl z-20 ">
          <span className="text-red-500 font-pokeso text-lg">DEFEATED</span>
        </div>
      )}
    </div>
  );
};

export default RandomCard;
