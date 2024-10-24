import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import PagesRoutes from "./PagesRoutes";

function App() {
  // Function to map routes to Route component
  const mapRoutes = (allRoutes) =>
    allRoutes.map((routeObj) => {
      if (routeObj.route) {
        return (
          <Route
            exact
            path={routeObj.route}
            element={routeObj.component}
            key={routeObj.key}
          />
        );
      }
      return null;
    });

  return (
    <ThemeProvider>
      <Routes>
        {mapRoutes(PagesRoutes)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
