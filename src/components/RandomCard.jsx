import { useContext } from "react";
import { BattleContext } from "../contexts/BattleContex";

const RandomCard = ({ pokemon }) => {
  const { image, name } = pokemon;
  const { isFighting } = useContext(BattleContext);

  return (
    <div className="w-2/3 m-2 ">
      <div
        className="relative w-full h-20 transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFighting ? "rotateX(180deg)" : "rotateX(0deg)" }}
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
            <div className="w-2/3 font-luckiest text-center text-yellow-300">
              {name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomCard;
