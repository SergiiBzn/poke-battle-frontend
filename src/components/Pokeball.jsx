import { useContext } from "react";
import { PokeContext } from "../contexts/PokeContext";
export default function Pokeball({ pokemon }) {
  const { isCaught, handleCatch } = useContext(PokeContext);

  // Base Color if isCaught = true
  const baseColors = {
    outerCircleFill: "white",
    upperHalfFill: "red",
    lowerHalfFill: "white",
    centerCircleFill: "rgba(255,255,255,0.5)",
  };
  // fi isCaught = false
  const transparentColors = {
    outerCircleFill: "rgba(211, 211, 211, 0.3)",
    upperHalfFill: "rgba(255,0,0,0.3)",
    lowerHalfFill: "rgba(255,255,255,0.3)",
    centerCircleFill: "rgba(255,255,255,0.3)",
  };

  const currentColors = isCaught(pokemon) ? baseColors : transparentColors;

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 200 200"
      className="cursor-pointer transition-all duration-300"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCatch(pokemon);
      }}
    >
      {/* outer circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        stroke="gray"
        strokeWidth="8"
        fill={currentColors.outerCircleFill}
        className="transition-colors duration-300"
      />

      {/* upper half */}
      <path
        d="M5 100 A95 95 0 0 1 195 100 L5 100 Z"
        fill={currentColors.upperHalfFill}
        className="transition-opacity duration-300 hover:opacity-50"
      />

      {/* middle line*/}
      <line x1="5" y1="100" x2="195" y2="100" stroke="gray" strokeWidth="8" />

      {/* center big circle */}
      <circle
        cx="100"
        cy="100"
        r="25"
        fill={currentColors.centerCircleFill}
        stroke="gray"
        strokeWidth="8"
      />

      {/* center small circle */}
      <circle
        cx="100"
        cy="100"
        r="10"
        fill={isCaught ? "rgba(255,255,255,0.5)" : "white"}
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
}
