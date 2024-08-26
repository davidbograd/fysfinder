import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./Components/HomePage.tsx";
import SuburbPage from "./Components/SuburbPage.tsx";
import ClinicDetailsPage from "./Components/ClinicDetailsPage";
import SiteLogo from "./Components/Icons/SiteLogo";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <header className="max-w-6xl mx-auto px-4 py-8 flex justify-center">
          <Link to="/" aria-label="Go to homepage">
            <SiteLogo />
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/:suburb"
            element={
              <div className="max-w-6xl mx-auto px-4">
                <SuburbPage />
              </div>
            }
          />
          <Route
            path="/:suburb/clinic/:clinicName"
            element={
              <div className="max-w-6xl mx-auto px-4">
                <ClinicDetailsPage />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
