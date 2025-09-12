import { Link } from "react-router";
const Header = () => {
  return (
    <header className="bg-[#ffcb00] flex flex-col justify-center space-y-4">
      <h1 className="font-pokeho text-xl md:text-3xl xl:text-4xl font-bold text-blue-700 flex justify-center gap-8 xl:gap-16 pt-8">
        <div>P o k é m o n</div> <div>F i g h t</div>
      </h1>
      <nav>
        <ul className="flex flex-col sm:flex-row justify-between">
          <Link
            to="/"
            className="btn btn-md sm:btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Pokédex
          </Link>
          <Link
            to="/party"
            className="btn btn-md sm:btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Party
          </Link>
          <Link
            to="/battle"
            className="btn btn-md sm:btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Battle
          </Link>
          <Link
            to="/leaderboard"
            className="btn btn-md sm:btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Leaderboard
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
