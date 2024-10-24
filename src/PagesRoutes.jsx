// pages
import Home from "./pages/home";
import Consultations from "./pages/consultations";

const PagesRoutes = [
  {
    name: "Home",
    key: "home",
    route: "/",
    component: <Home />,
  },
  {
    name: "Consultations",
    key: "consultations",
    route: "/consultations",
    component: <Consultations />,
  }
]

export default PagesRoutes;
