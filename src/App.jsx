import { Routes, Route } from "react-router";
import MainLayouts from "./layouts/MainLayouts";
import PokeContextProvider from "./contexts/PokeContext";
import { Battle, PokeDetails, MyParty, Pokedex, Leaderboard } from "./pages";

const App = () => {
  return (
    <PokeContextProvider>
      <Routes>
        <Route element={<MainLayouts />}>
          <Route index element={<Pokedex />} />
          <Route path="/pokemons/:id" element={<PokeDetails />} />
          <Route path="/party" element={<MyParty />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </PokeContextProvider>
  );
};

export default App;
