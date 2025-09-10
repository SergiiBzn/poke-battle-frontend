import { Outlet } from "react-router";
import { Footer, Header } from "../components";

const MainLayouts = () => {
  return (
    <div className="min-h-full flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayouts;
