import { useContext } from "react";
import Pokeball from "./Pokeball";
import { PokeContext } from "../contexts/PokeContext";
import { Link } from "react-router";

const PokeCard = ({ pokemon }) => {
  const { isCaught, catchPokemon, releasePokemon } = useContext(PokeContext);

  const handleCatch = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCaught(pokemon)) {
      releasePokemon(pokemon);
    } else {
      catchPokemon(pokemon);
    }
  };

  return (
    <Link to={`/pokemons/${pokemon.id}`}>
      <div className="card bg-white shadow-md rounded-xl relative">
        <figure>
          <img src={pokemon.image} alt={pokemon.name} className="h-60" />
        </figure>
        <div className=" text-yellow-900 flex justify-center items-center my-4 gap-4">
          <span className="transform transition hover:scale-110">
            <Pokeball isCaught={isCaught(pokemon)} handleCatch={handleCatch} />
          </span>
          <span className="text-center font-luckiest text-2xl">
            {pokemon.name}
          </span>
        </div>
      </div>
    </Link>
    // <Link
    //   to={`/details/${pokemon.id}`}
    //   className="group w-64 h-80 [perspective:1000px] cursor-pointer"
    // >
    //   <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    //     {/* 正面 */}
    //     <div className="absolute inset-0 bg-white shadow-md rounded-xl flex flex-col items-center justify-center [backface-visibility:hidden]">
    //       <div
    //         className="absolute top-5 right-5 hover:animate-bounce"
    //         onClick={handleCatch}
    //       >
    //         <Pokeball isCaught={isCaught(pokemon)} />
    //       </div>

    //       <figure>
    //         <img src={image} alt={pokemon.name} className="h-40 mx-auto" />
    //       </figure>
    //       <div className="mt-4 text-yellow-900">
    //         <h2 className="text-center font-luckiest text-2xl capitalize">
    //           {pokemon.name}
    //         </h2>
    //       </div>
    //     </div>

    //     {/* 背面 */}
    //     <div className="absolute inset-0 bg-yellow-100 shadow-md rounded-xl flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] p-4">
    //       <h3 className="font-bold text-lg mb-2">Types</h3>
    //       <ul className="flex gap-2 flex-wrap justify-center">
    //         {pokemon.types.map((t) => (
    //           <li
    //             key={t.type.name}
    //             className="px-3 py-1 rounded-full bg-yellow-300 text-sm font-medium capitalize"
    //           >
    //             {t.type.name}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default PokeCard;
