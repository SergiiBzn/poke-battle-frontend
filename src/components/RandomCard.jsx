import { useContext } from "react";
import { BattleContext } from "../contexts/BattleContex";

const RandomCard = ({ pokemon, winner }) => {
  const { image, name } = pokemon;
  const { openCard } = useContext(BattleContext);
  const isDefeated = winner && winner !== pokemon.name;
  const isWin = winner && winner === pokemon.name;
  return (
    <div className="w-full h-20 m-2 ">
      <div
        className="relative w-full h-full min-h-[5rem] transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: openCard ? "rotateX(180deg)" : "rotateX(0deg)" }}
      >
        {/* vorwarts */}
        <div className="absolute inset-0 flex items-center bg-blue-400 rounded-2xl p-2 border-amber-200 [backface-visibility:hidden]">
          <div className=" avatar w-1/3">
            <div className="w-16 bg-amber-100 rounded-full"></div>
          </div>
          <div className="w-2/3 font-luckiest text-center text-yellow-300">
            ???
          </div>
        </div>
        {/* rückwarts */}
        <div className="absolute inset-0 [transform:rotateX(180deg)] [backface-visibility:hidden]">
          <div
            className={`flex items-center bg-blue-400 rounded-2xl p-2 border-amber-200 `}
          >
            <div className=" avatar w-1/3">
              <div className="w-16 bg-amber-100 rounded-full">
                <img src={image} />
              </div>
            </div>
            <div
              className={`w-2/3 font-luckiest text-center text-yellow-300 ${
                isWin ? "scale-125 animate-bounce" : ""
              }`}
            >
              {name}
            </div>
          </div>
          {isDefeated && (
            <div className="absolute inset-0  bg-gray-500 opacity-80 flex items-center justify-center rounded-2xl z-20 ">
              <span className="text-red-500 font-pokeso text-lg">DEFEATED</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomCard;
