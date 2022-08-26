import styles from "./Spline.module.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

const Spline = ({ titles }) => {
  return (
    <div className="{styles.chart}">
      {/* <div className={styles.canvas_wrapper}> */}
      <div className={styles.card}>
        {titles === "Departments" && (
          <>
            <p className={styles.title}>Departments</p>
            <p className={styles.text}>Manage Your Departments</p>
          </>
        )}
        {titles === "SubDepartment" && (
          <>
            <p className={styles.title}>SubDepartments</p>
            <p className={styles.text}>Manage Your SubDepartments</p>
          </>
        )}
        {titles === "Team Department" && (
          <>
            <p className={styles.title}>Team Department</p>
            <p className={styles.text}>Manage Your Team Departments</p>
          </>
        )}
        {titles === "Individual Departments" && (
          <>
            <p className={styles.title}>Individual Departments</p>
            <p className={styles.text}>Manage Your Individual Departments</p>
          </>
        )}
        {titles === "Roles" && (
          <>
            <p className={styles.title}>Roles</p>
            <p className={styles.text}>Manage Your Roles</p>
          </>
        )}
        {titles === "Users" && (
          <>
            <p className={styles.title}>Users</p>
            <p className={styles.text}>Manage Your Users</p>
          </>
        )}
        {titles === "Perspectives" && (
          <>
            <p className={styles.title}>Perspectives</p>
            <p className={styles.text}>Manage Your Perspectives</p>
          </>
        )}
        {titles === "Objectives" && (
          <>
            <p className={styles.title}>Objectives</p>
            <p className={styles.text}>Manage Your Objectives</p>
          </>
        )}
        {titles === "KPIs" && (
          <>
            <p className={styles.title}>KPIs</p>
            <p className={styles.text}>Manage Your KPIs</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Spline;
