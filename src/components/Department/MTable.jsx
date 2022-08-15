import faker from "faker";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAPI } from "../../Context/APIContext";
import loader from "../../resources/images/loader.gif";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import { useEffect } from "react";
import { FaCircle, FaPlus } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

let USERS = [],
  STATUSES = ["Active", "Pending", "Blocked"];
for (let i = 0; i < 14; i++) {
  USERS[i] = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName(),
    joinDate: faker.date.past().toLocaleDateString("en-US"),
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
  };
}

const MTable = () => {
  const location = useLocation();
  const Dashboardpage = location.state.page;
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [kpis, setKpis] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [RoleName, setRoleName] = useState("");
  const [hierarchy, setHierarchy] = useState("");
  const [index, setIndex] = useState(0);
  const [perspectives, setPerspective] = useState([]);
  const {
    userType,
    useDepartment,
    useSubDepartment,
    usedepartments,
    useSubDepartments,
    useroles,
    useUsers,
    urlKEY
  } = useAPI();
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let navigate = useNavigate();

  const editPage = (dept, deptId, index) => {
    let path = "/Edit";
    navigate(path, {
      state: {
        page: "EDIT",
        dashboardPage: Dashboardpage,
        perspectives: perspectives,
        index: index,
        kpi: kpis,
      },
    });
  };

  const handleDelete = () => {
    // fetch(`https://bsc-newapi.herokuapp.com/core/department/`)
    //   .then((res) => {
    //     const data = res.json();
    //     if (!res.ok) {
    //       const error = (data && data.message) || res.status;
    //       return Promise.reject(error);
    //     }
    //     alert("Delete Successful");
    //   })
    //   .catch((error) => {
    //     alert("There was an error!", error);
    //   });
  };
  const handleAdd = (index) => {
    let path = "/Edit";
    navigate(path, {
      state: {
        page: "ADD",
        dashboardPage: Dashboardpage,
        perspectives: perspectives,
        index: "",
        kpi: kpis,
      },
    });
  };
  useEffect(() => {
    console.log("User Type: " + userType);
    console.log("Department: " + useDepartment);
    console.log("Subdepartment: " + useSubDepartment);
  }, [useDepartment, userType]);
  useEffect(() => {
    const perspUrl =
         `https://pms-apis.herokuapp.com/bsc/perspective/${urlKEY}/`;
    const objUrl = `https://pms-apis.herokuapp.com/bsc/objective/${urlKEY}/`;

    const kpiUrl = `https://pms-apis.herokuapp.com/bsc/kpi/${urlKEY}/`

    fetch(perspUrl)
      .then((res) => res.json())
      .then((result) => {
        setPerspective(result);
      });

    if (Dashboardpage === "dept") {
      fetch("https://pms-apis.herokuapp.com/core/department/")
        .then((res) => res.json())
        .then((result) => {
          setKpis(result);
          perspectives !== [] && setLoading(false);
          console.log(result);
        });
    } else if (Dashboardpage === "subDept") {
      fetch("https://pms-apis.herokuapp.com/core/subdepartment/")
        .then((res) => res.json())
        .then((result) => {
          setKpis(result);
          perspectives !== [] && setLoading(false);
          console.log(result);
        });
    } else if (Dashboardpage === "role") {
      fetch("https://pms-apis.herokuapp.com/core/role/")
        .then((res) => res.json())
        .then((result) => {
          setKpis(result);
          perspectives !== [] && setLoading(false);
          console.log(result);
        });
    } else if (Dashboardpage === "user") {
      fetch("https://pms-apis.herokuapp.com/core/users/")
        .then((res) => res.json())
        .then((result) => {
          setKpis(result);
          perspectives !== [] && setLoading(false);
          console.log(result);
        });
    } else if (Dashboardpage === "persp") {
        fetch(perspUrl)
          .then((res) => res.json())
          .then((result) => {
            setKpis(result);
            perspectives !== [] && setLoading(false);
            console.log(result);
          });
    } else if (Dashboardpage === "obj") {
        fetch(objUrl)
          .then((res) => res.json())
          .then((result) => {
            setKpis(result);
            perspectives !== [] && setLoading(false);
            console.log(result);
          });
    } else if (Dashboardpage === "kpi") {
        fetch(kpiUrl)
          .then((res) => res.json())
          .then((result) => {
            setKpis(result);
            perspectives !== [] && setLoading(false);
            console.log(result);
          
          })
        }
  }, []);

  return loading ? (
    <div className="loader-landing">
      {"Loading..."}
      <img className="img-loader big-wrapper" src={loader} />
    </div>
  ) : (
    <div className="Table">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            {Dashboardpage === "dept" && (
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Department
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Manage
                </TableCell>
              </TableRow>
            )}
            {Dashboardpage === "subDept" && (
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  SubDepartment
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Department
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Manage
                </TableCell>
              </TableRow>
            )}
            {Dashboardpage === "role" && (
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Role Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Hierarchy
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Manage
                </TableCell>
              </TableRow>
            )}
            {Dashboardpage === "user" && (
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Username
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  First Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Last Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Role</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Department
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Sub Department
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Manage
                </TableCell>
              </TableRow>
            )}
            {Dashboardpage === "persp" && (
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Perspective Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Perspective Weight
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>User</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Manage
                </TableCell>
              </TableRow>
            )}
            {Dashboardpage === "obj" && (
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Objective Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Objective Weight
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Perspective
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>User</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Manage
                </TableCell>
              </TableRow>
            )}
            {Dashboardpage === "kpi" && (
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  KPI Name
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  KPI Weight
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  KPI Target
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  KPI Unit of Measurement
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Manage
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {kpis.map((kpi, index) => (
              <TableRow key={index}>
                {Dashboardpage === "dept" && (
                  <>
                    <TableCell>{kpi.dept_name}</TableCell>
                  </>
                )}
                {Dashboardpage === "subDept" && (
                  <>
                    <TableCell>{kpi.name}</TableCell>
                    <TableCell>
                      {usedepartments &&
                        usedepartments.length > 0 &&
                        usedepartments
                          .filter((dep) => dep.dept_id === kpi.department)
                          .map((department, index) => department.dept_name)}
                    </TableCell>
                  </>
                )}
                {Dashboardpage === "role" && (
                  <>
                    <TableCell>{kpi.role_name}</TableCell>
                    <TableCell>{kpi.hierarchy}</TableCell>
                  </>
                )}
                {Dashboardpage === "persp" && (
                  <>
                    <TableCell>{kpi.perspective_name}</TableCell>
                    <TableCell>{parseFloat(kpi.perspective_weight)*100}</TableCell>
                    <TableCell>
                      {useUsers &&
                        useUsers.length > 0 &&
                        useUsers
                          .filter((user) => user.id === kpi.user)
                          .map((us) => us.username)}
                    </TableCell>
                  </>
                )}
                {Dashboardpage === "user" && (
                  <>
                    <TableCell>{kpi.username}</TableCell>
                    <TableCell>{kpi.first_name}</TableCell>
                    <TableCell>{kpi.last_name}</TableCell>
                    <TableCell>
                      {useroles && useroles.length > 0
                        ? useroles
                            .filter((role) => role.role_id === kpi.role)
                            .map((ro) => ro.role_name)
                        : "j"}
                    </TableCell>

                    <TableCell>
                      {usedepartments && usedepartments.length > 0
                        ? usedepartments
                            .filter((dep) => dep.dept_id === kpi.department)
                            .map((department) => department.dept_name)
                        : ""}
                    </TableCell>
                    <TableCell>
                      {useSubDepartments &&
                        useSubDepartments.length > 0 &&
                        useSubDepartments
                          .filter((subdep) => subdep.id === kpi.subdepartment)
                          .map((sub) => sub.name)}
                    </TableCell>
                  </>
                )}
                {Dashboardpage === "obj" && (
                  <>
                    <TableCell>{kpi.objective_name}</TableCell>
                    <TableCell>{parseFloat(kpi.objective_weight)*100}</TableCell>
                    {/* <TableCell>{kpi.perspective}</TableCell> */}
                    {perspectives && perspectives.length > 0
                      ? perspectives
                          .filter(
                            (persp) => persp.perspective_id === kpi.perspective
                          )
                          .map((per) => (
                            <TableCell key={index}>
                              {" "}
                              {per.perspective_name}{" "}
                            </TableCell>
                          ))
                      : ""}
                    <TableCell>
                      {useUsers && useUsers.length > 0
                        ? useUsers
                            .filter((user) => user.id === kpi.user)
                            .map((us) => us.username)
                        : ""}
                    </TableCell>
                  </>
                )}
                {Dashboardpage === "kpi" && (
                  <>
                    <TableCell>{kpi.kpi_name}</TableCell>
                    <TableCell>{parseFloat(kpi.kpi_weight)*100}</TableCell>
                    <TableCell>{kpi.kpi_unit_measurement === "Percentage" ? parseFloat(kpi.kpi_target)*100:kpi.kpi_target}</TableCell>
                    <TableCell>{kpi.kpi_unit_measurement}</TableCell>
                  </>
                )}
                <TableCell>
                  <button
                    className="btn edit"
                    style={{
                      backgroundColor: "orange",
                    }}
                    onClick={() => editPage(kpi.dept_name, kpi.dept_id, index)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn delete"
                    style={{
                      backgroundColor: "red",
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
        <TablePagination
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter> */}
        </Table>
      </TableContainer>
      <div>
        <button className="btn add" onClick={() => handleAdd(index)}>
          <FontAwesomeIcon
            style={{
              width: "25px",
              height: "25px",
            }}
            icon={faPlus}
          />
          {Dashboardpage === "dept" && "Add Department"}
          {Dashboardpage === "subDept" && "Add SubDepartment"}
          {Dashboardpage === "role" && "Add Role"}
          {Dashboardpage === "user" && "Add User"}
          {Dashboardpage === "persp" && "Add Perspective"}
          {Dashboardpage === "obj" && "Add Objective"}
          {Dashboardpage === "kpi" && "Add KPI"}
        </button>
      </div>
    </div>
  );
};

export default MTable;
