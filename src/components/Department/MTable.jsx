import faker from "faker";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItemsAdmin } from "./MenuItemsAdmin";
import { MenuItemsUser } from "./MenuItemsUser";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAPI } from "../../Context/APIContext";
import loader from "../../resources/images/loader.gif";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Hidden,
} from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    flex: "1",
    margin: "10px 10px",
    maxWidth: 1250,
    maxHeight: "fit-content",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
}));

const MTable = () => {
  const location = useLocation();
  const Dashboardpage = location.state.page;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [kpis, setKpis] = useState([]);
  const [filteredKpis, setFilteredKpis] = useState([]);
  const [index, setIndex] = useState(0);
  const [barClicked, setBarClicked] = useState(false);
  const [perspectives, setPerspective] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    userType,
    useDepartment,
    useSubDepartment,
    usedepartments,
    useSubDepartments,
    useTeamDepartments,
    useIndividualDepartments,
    useroles,
    useUsers,
    urlKEY,
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

  const editPage = (index) => {
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
  const handleAdd = () => {
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
    if (Dashboardpage === "dept") {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.dept_name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else if (Dashboardpage === "subDept") {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else if (Dashboardpage === "role") {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.role_name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else if (Dashboardpage === "persp") {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.perspective_name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else if (Dashboardpage === "obj") {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.objective_name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else if (Dashboardpage === "user") {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.username.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else if (Dashboardpage === "kpi") {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.kpi_name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    } else {
      setPage(0);
      setFilteredKpis(
        kpis.filter((kpi) =>
          kpi.name.toUpperCase().includes(searchTerm.toUpperCase())
        )
      );
    }
  }, [searchTerm, kpis]);
  useEffect(() => {
    console.log("User Type: " + userType);
    console.log("Department: " + useDepartment);
    console.log("Subdepartment: " + useSubDepartment);
  }, [useDepartment, userType, barClicked]);
  useEffect(() => {
    const perspUrl = `https://pms-apis.herokuapp.com/bsc/perspective/${urlKEY}/`;
    const objUrl = `https://pms-apis.herokuapp.com/bsc/objective/${urlKEY}/`;

    const kpiUrl = `https://pms-apis.herokuapp.com/bsc/kpi/${urlKEY}/`;

    fetch(perspUrl)
      .then((res) => res.json())
      .then((result) => {
        setPerspective(result);
      });

    if (Dashboardpage === "dept") {
      setKpis(usedepartments);
      perspectives !== [] && setLoading(false);
    } else if (Dashboardpage === "subDept") {
      setKpis(useSubDepartments);
      perspectives !== [] && setLoading(false);
    } else if (Dashboardpage === "individualDep") {
      setKpis(useIndividualDepartments);
      perspectives !== [] && setLoading(false);
    } else if (Dashboardpage === "sub-subDept") {
      setKpis(useTeamDepartments);
      perspectives !== [] && setLoading(false);
    } else if (Dashboardpage === "role") {
      setKpis(useroles);
      perspectives !== [] && setLoading(false);
    } else if (Dashboardpage === "user") {
      setKpis(useUsers);
      perspectives !== [] && setLoading(false);
    } else if (Dashboardpage === "persp") {
      setLoading(true);
      fetch(perspUrl)
        .then((res) => res.json())
        .then((result) => {
          setKpis(result);
          perspectives !== [] && setLoading(false);
          console.log(result);
        });
    } else if (Dashboardpage === "obj") {
      setLoading(true);
      fetch(objUrl)
        .then((res) => res.json())
        .then((result) => {
          setKpis(result);
          perspectives !== [] && setLoading(false);
          console.log(result);
        });
    } else if (Dashboardpage === "kpi") {
      setLoading(true);
      fetch(kpiUrl)
        .then((res) => res.json())
        .then((result) => {
          setKpis(result);
          perspectives !== [] && setLoading(false);
          console.log(result);
        });
    }
  }, [Dashboardpage]);

  const handleLinkClick = (path, page) => {
    navigate(path, { state: { page: page } });
    setBarClicked(false);
    setLoading(true);
  };

  return loading ? (
    <div className="loader-landing">
      {"Loading..."}
      <img className="img-loader big-wrapper" src={loader} />
    </div>
  ) : (
    <div className="Table">
      {/* <div className="Clickbar">
        <i
          onClick={handleBarClick}
          className={barClicked ? "fas fa-times" : "fas fa-bars"}
        ></i>
      </div> */}
      <div className="search-header">
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">Search</button>
        <button className="btn add" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul className={barClicked ? "nav-menu active" : "nav-menu"}>
        {userType === "admin"
          ? MenuItemsAdmin.map((items, index) => {
              return (
                <li key={index}>
                  <a onClick={() => handleLinkClick(items.path, items.page)}>
                    {items.title}
                  </a>
                </li>
              );
            })
          : MenuItemsUser.map((items, index) => {
              return (
                <li key={index}>
                  <a onClick={() => handleLinkClick(items.path, items.page)}>
                    {items.title}
                  </a>
                </li>
              );
            })}
      </ul>

      <>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              {Dashboardpage === "dept" && (
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Process
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Manage
                  </TableCell>
                </TableRow>
              )}
              {Dashboardpage === "subDept" && (
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Sub-Process
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Process
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Manage
                  </TableCell>
                </TableRow>
              )}
              {Dashboardpage === "sub-subDept" && (
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Head Office Team / Branch
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Sub-Process
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Manage
                  </TableCell>
                </TableRow>
              )}
              {Dashboardpage === "individualDep" && (
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Position
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Head Office Team / Branch
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
                  <TableCell className={classes.tableHeaderCell}>
                    Role
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Process
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Sub-Process
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Head Office Team / Branch
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Position
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
                  <TableCell className={classes.tableHeaderCell}>
                    User
                  </TableCell>
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
                  <TableCell className={classes.tableHeaderCell}>
                    User
                  </TableCell>
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
              {filteredKpis
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((kpi, index) => (
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
                    {Dashboardpage === "sub-subDept" && (
                      <>
                        <TableCell>{kpi.name}</TableCell>
                        <TableCell>
                          {useSubDepartments &&
                            useSubDepartments.length > 0 &&
                            useSubDepartments
                              .filter(
                                (subDep) => subDep.id === kpi.subdepartment
                              )
                              .map((subd, index) => subd.name)}
                        </TableCell>
                      </>
                    )}
                    {Dashboardpage === "individualDep" && (
                      <>
                        <TableCell>{kpi.name}</TableCell>
                        <TableCell>
                          {useTeamDepartments &&
                            useTeamDepartments.length > 0 &&
                            useTeamDepartments
                              .filter(
                                (indivDep) =>
                                  indivDep.id === kpi.sub_subdepartment
                              )
                              .map((indivDe, index) => indivDe.name)}
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
                        <TableCell>
                          {parseFloat(kpi.perspective_weight) * 100}
                        </TableCell>
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
                              .filter(
                                (subdep) => subdep.id === kpi.subdepartment
                              )
                              .map((sub) => sub.name)}
                        </TableCell>
                        <TableCell>
                          {useTeamDepartments &&
                            useTeamDepartments.length > 0 &&
                            useTeamDepartments
                              .filter(
                                (teamDep) =>
                                  teamDep.id === kpi.sub_subdepartment
                              )
                              .map((t) => t.name)}
                        </TableCell>
                        <TableCell>
                          {useIndividualDepartments &&
                            useIndividualDepartments.length > 0 &&
                            useIndividualDepartments
                              .filter(
                                (indiDep) => indiDep.id === kpi.individuals
                              )
                              .map((i) => i.name)}
                        </TableCell>
                      </>
                    )}
                    {Dashboardpage === "obj" && (
                      <>
                        <TableCell>{kpi.objective_name}</TableCell>
                        <TableCell>
                          {parseFloat(kpi.objective_weight) * 100}
                        </TableCell>
                        {/* <TableCell>{kpi.perspective}</TableCell> */}
                        {perspectives && perspectives.length > 0
                          ? perspectives
                              .filter(
                                (persp) =>
                                  persp.perspective_id === kpi.perspective
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
                        <TableCell>
                          {parseFloat(kpi.kpi_weight) * 100}
                        </TableCell>
                        <TableCell>
                          {kpi.kpi_unit_measurement === "Percentage"
                            ? parseFloat(kpi.kpi_target) * 100
                            : kpi.kpi_target}
                        </TableCell>
                        <TableCell>{kpi.kpi_unit_measurement}</TableCell>
                      </>
                    )}
                    <TableCell>
                      <button
                        className="btn edit"
                        onClick={() => editPage(page * rowsPerPage + index)}
                      >
                        {/* Edit */}
                        <ModeEditOutlinedIcon />
                      </button>

                      {/* <button
                      className="btn delete"
                      style={{
                        backgroundColor: "red",
                      }}
                      onClick={() => handleDelete(page * rowsPerPage + index)}
                    >
                      Delete
                    </button> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TablePagination
              component="tbody"
              count={kpis.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </>
    </div>
  );
};

export default MTable;
