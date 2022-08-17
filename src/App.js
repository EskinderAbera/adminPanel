import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Campaings from "./components/Campaigns/Campaings";
import Team from "./components/Team/Team";
import NavContext from "./Context/NavContext";
import KPIList from "./components/KPI/KPIList";
import Department from "./components/Department/Department";
import MTable from "./components/Department/MTable";
import EditDept from "./components/Department/Edit";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Protected from "./Protected";
import { APIContextProvider } from "./Context/APIContext";

function App() {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <div className="App">
      <NavContext.Provider value={value}>
        <Navbar />
        <Container
          stickyNav={<RightNavbar />}
          content={
            <APIContextProvider>
              <Routes>
                <Route path="*" element={<main>NOT FOUND</main>} />
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route
                  exact
                  path="/login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                ></Route>
                <Route path="/landing" element={ <Protected isLoggedIn={isLoggedIn}><LandingPage /></Protected>} />
                <Route path="/dashboard" element={<Protected isLoggedIn={isLoggedIn}><Dashboard /></Protected>} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/campaings" element={<Campaings />} />
                <Route path="/team" element={<Team />} />
                <Route path="/messages" element={<main>Messages</main>} />
                <Route path="/dept" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/subDepartment" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/teamDepartment" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/individualDepartment" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/role" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/user" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/perspective" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/objective" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/kpi" element={<Protected isLoggedIn={isLoggedIn}><MTable /></Protected>} />
                <Route path="/Edit" element={<Protected isLoggedIn={isLoggedIn}><EditDept /></Protected>} />
              </Routes>
            </APIContextProvider>
          }
        />
      </NavContext.Provider>
    </div>
  );
}

export default App;
