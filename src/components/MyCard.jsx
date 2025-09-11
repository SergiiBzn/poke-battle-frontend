import { useState } from "react";
import { useContext } from "react";
import { BattleContext } from "../contexts/BattleContex";

const MyCard = ({ pokemon }) => {
  const { image, name } = pokemon;
  const { editTeam } = useContext(BattleContext);

  const [isSelected, setIsSelect] = useState(false);
  const handleClick = () => {
    setIsSelect((prev) => !prev);
    editTeam(pokemon);
  };
  return (
    <div
      className={`flex items-center bg-blue-400 w-2/3 rounded-2xl p-2 m-2 border-amber-200 ${
        isSelected ? "border-4" : "border-0"
      }`}
      onClick={() => handleClick()}
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
  );
};

export default MyCard;
