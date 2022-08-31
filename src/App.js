import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "./components/Container/Container";
import Dashboard from "./components/Dashboard/Dashboard";
import MTable from "./components/Department/MTable";
import EditDept from "./components/Department/Edit";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Protected from "./Protected";
import { APIContextProvider } from "./Context/APIContext";
import Sidebar from "./components/SideBar/Sidebar";
import "./sideBarFlex.css";

function App() {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Container
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
              <Route
                path="/landing"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <LandingPage />
                  </Protected>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <Dashboard />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/dept"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/subDepartment"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/teamDepartment"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/individualDepartment"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/role"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/user"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/perspective"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/objective"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/kpi"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <MTable />
                    </div>
                  </Protected>
                }
              />
              <Route
                path="/Edit"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <div className="sidebarContainer">
                      <Sidebar />
                      <EditDept />
                    </div>
                  </Protected>
                }
              />
            </Routes>
          </APIContextProvider>
        }
      />
    </div>
  );
}

export default App;
