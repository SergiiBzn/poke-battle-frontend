import { Outlet } from "react-router";
import { Footer, Header } from "../components";

const MainLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayouts;
