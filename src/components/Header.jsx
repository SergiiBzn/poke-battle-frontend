import { Link } from "react-router";
const Header = () => {
  return (
    <header className=" bg-[#ffcb00] flex flex-col justify-center space-y-4">
      <h1 className="font-pokeho text-5xl pt-8 font-bold text-blue-700 text-center flex justify-center gap-16">
        <div>P o k é m o n</div> <div>F i g h t</div>
      </h1>
      <nav>
        <ul className="flex justify-between p-2">
          <Link
            to="/"
            className="btn btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Pokédex
          </Link>
          <Link
            to="/party"
            className="btn btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Party
          </Link>
          <Link
            to="/battle"
            className="btn btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Battle
          </Link>
          <Link
            to="/leaderboard"
            className="btn btn-lg btn-ghost hover:bg-yellow-900 hover:text-white text-yellow-900"
          >
            Leaderboard
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
