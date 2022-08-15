import styles from "./Dashboard.module.scss";
import Spline from "./Charts/Spline";
import { MdOutlineWavingHand } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Analytics from "../Analytics/Analytics";
import { useEffect} from "react";

const Dashboard = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const Users = ["Departments", "Roles", "Users"];
  const Bsc = ["Perspective", "Objective", "KPIs"];

  const handleDepartment = () => {
    navigate("/dept", { state: { page: "dept" } });
  };

  const handleSubDepartment = () => {
    navigate("/subDepartment", { state: { page: "subDept" } });
  };

  const handleRoles = () => {
    navigate("/role", { state: { page: "role" } });
  };

  const handleUsers = () => {
    navigate("/user", { state: { page: "user" } });
  };

  const handlePerspectives = () => {
    navigate("/perspective", { state: { page: "persp" } });
  };

  const handleObjectives = () => {
    navigate("/objective", { state: { page: "obj" } });
  };

  const handleKpis = () => {
    navigate("/kpi", { state: { page: "kpi" } });
  };

  return (
    <main className={styles.container}>
      <div className={styles.welcome}>
        <h1>
          Hello , Admin.
          <MdOutlineWavingHand />
        </h1>
      </div>
      <div className={styles.charts}>
        <div className={styles.lines} onClick={handleDepartment}>
          <Spline titles="Departments" />
        </div>
        <div className={styles.lines} onClick={handleSubDepartment}>
          <Spline titles="SubDepartment" />
        </div>
        <div className={styles.lines} onClick={handleRoles}>
          <Spline titles="Roles" />
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.lines} onClick={handleUsers}>
          <Spline titles="Users" />
        </div>
        <div className={styles.lines} onClick={handlePerspectives}>
          <Spline titles="Perspectives" />
        </div>
        <div className={styles.lines} onClick={handleObjectives}>
          <Spline titles="Objectives" />
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.lines} onClick={handleKpis}>
          <Spline titles="KPIs" />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
