import { useState, useEffect } from "react";
import { useContext } from "react";
import { BattleContext } from "../contexts/BattleContex";

const MyCard = ({ pokemon }) => {
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
  return (
    <div
      className={`flex items-center bg-blue-400 w-full h-20 rounded-2xl p-2 m-2 border-amber-200 ${
        isSelected ? "border-4" : ""
      }`}
      onClick={() => handleClick()}
    >
      <div className=" avatar w-16 h-16 flex-shrink-0">
        <div className="w-16 h-16 bg-amber-100 rounded-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-1 font-luckiest text-center text-yellow-300 px-2 truncate">
        {name}
      </div>
    </div>
  );
};

export default MyCard;
