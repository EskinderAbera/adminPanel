import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import shape from "./components/img/shape.png";
import hailes from "./resources/images/hailes_cleanup.jpg";
import loader from "./resources/images/loader.gif";
import coop from "./resources/images/coop.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { bounce, fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import { useAPI } from "./Context/APIContext";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;
`;
const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeIn}`} infinite;
`;

if (typeof window !== "undefined") {
  injectStyle();
}
const LandingPage = () => {
  let navigate = useNavigate();
  const {
    changeUserType,
    changeDepartment,
    changeSubDepartment,
    changeTeamDepartment,
    changeIndividualDepartment,
    changeTeamDepartments,
    changeIndividualDepartments,
    changeDepartments,
    changeSubDepartments,
    changeRoles,
    changeUsers,
    changeUrlKEY,
  } = useAPI();
  const [loading, setLoading] = useState(true);
  const [departmentResponse, setDepartmentResponse] = useState([]);
  const [subDepartmentResponse, setSubdepartmentResponse] = useState([]);
  const [teamDepartmentResponse, setTeamDepartmentResponse] = useState([]);
  const [individualDepartmentResponse, setIndividualDepartmentResponse] =
    useState([]);
  const [roleResponse, setRoleResponse] = useState([]);
  const [department, setDepartment] = useState("select");
  const [departmentId, setDepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [role, setRole] = useState("select");
  const [roleId, setRoleId] = useState("");
  const [subdepartments, setSubdepartments] = useState([]);
  const [subdepartment, setSubdepartment] = useState("select");
  const [subdepartmentId, setSubdepartmentId] = useState(null);
  const [teamDepartment, setTeamDepartment] = useState("select");
  const [teamDepartmentId, setTeamDepartmentId] = useState(null);
  const [individualDepartment, setIndividualDepartment] = useState("select");
  const [individualDepartmentId, setIndividualDepartmentId] = useState(null);
  const [userId, setUserId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const url = "https://pms-apis.herokuapp.com";

  const HandleDepartmentId = (department) => {
    departments
      .filter((depar) => depar.dept_name === department)
      .map((d) => setDepartmentId(d.dept_id));
  };

  const HandleError = () => {
    toast.error("Please select the appropriate dropdowns", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const handleRoleChange = (e) => {
    changeUserType(e.target.value);
    setRole(e.target.value);
    const tempRole = e.target.value;
    console.log(e.target.value);

    roleResponse
      .filter((role) => role.role_name === e.target.value)
      .map((r) => setRoleId(r.role_id));

    if (
      e.target.value !== "President" &&
      e.target.value !== "admin" &&
      e.target.value !== "select"
    ) {
      setDepartments(departmentResponse);
    } else {
      setDepartments([]);
    }
    if (department !== "select") {
      setSubdepartments(subDepartmentResponse);
    }

    if (tempRole === "admin" || tempRole === "President") {
      setDepartmentId(null);
      setSubdepartmentId(null);
      setTeamDepartmentId(null);
      setIndividualDepartmentId(null);
    }
    if(tempRole === "Vice President"){
      setSubdepartmentId(null);
      setTeamDepartmentId(null);
      setIndividualDepartmentId(null);
    }
    if (tempRole === "director") {
      setTeamDepartmentId(null);
      setIndividualDepartmentId(null);
    }
    if (tempRole === "Manager") {
      setIndividualDepartmentId(null);
    }
  };

  const handleDepartmentChange = (e) => {
    changeDepartment(e.target.value);
    setDepartment(e.target.value);

    console.log(e.target.value);

    departmentResponse
      .filter((department) => department.dept_name === e.target.value)
      .map((dep) => setDepartmentId(dep.dept_id));

    if (
      e.target.value !== "select" &&
      (role === "director" || role === "Manager" || role === "Individuals")
    ) {
      setSubdepartments(subDepartmentResponse);
    } else {
      setSubdepartments([]);
    }
    if (role !== "director" && role !== "Manager" && role !== "Individuals") {
      setSubdepartments([]);
    }
    

    HandleDepartmentId(e.target.value);
  };

  const handleSubDepartmentChange = (e) => {
    changeSubDepartment(e.target.value);
    setSubdepartment(e.target.value);
    subDepartmentResponse
      .filter((subdepartment) => subdepartment.name === e.target.value)
      .map((subdep) => setSubdepartmentId(subdep.id));
  };

  const handleTeamDepartmentChange = (e) => {
    changeTeamDepartment(e.target.value);
    setTeamDepartment(e.target.value);
    teamDepartmentResponse
      .filter((teamDepres) => teamDepres.name === e.target.value)
      .map((tdr) => setTeamDepartmentId(tdr.id));
  };

  const handleIndividualDepartmentChange = (e) => {
    changeIndividualDepartment(e.target.value);
    setIndividualDepartment(e.target.value);
    individualDepartmentResponse
      .filter((individualDep) => individualDep.name === e.target.value)
      .map((idr) => setIndividualDepartmentId(idr.id));
  };

  useEffect(() => {
    fetch("https://pms-apis.herokuapp.com/core/department/")
      .then((response) => response.json())
      .then((res) => {
        setDepartmentResponse(res);
        changeDepartments(res);
      });
    fetch("https://pms-apis.herokuapp.com/core/subdepartment/")
      .then((response) => response.json())
      .then((res) => {
        setSubdepartmentResponse(res);
        changeSubDepartments(res);
      });
    fetch("https://pms-apis.herokuapp.com/core/subsub/")
      .then((response) => response.json())
      .then((res) => {
        setTeamDepartmentResponse(res);
        changeTeamDepartments(res);
      });
    fetch("https://pms-apis.herokuapp.com/core/individual/")
      .then((response) => response.json())
      .then((res) => {
        setIndividualDepartmentResponse(res);
        changeIndividualDepartments(res);
      });
    fetch("https://pms-apis.herokuapp.com/core/role/")
      .then((response) => response.json())
      .then((res) => {
        setRoleResponse(res);
        changeRoles(res);
      });
    fetch("https://pms-apis.herokuapp.com/core/users/")
      .then((response) => response.json())
      .then((res) => {
        changeUsers(res);
        setUsersList(res);
      });
  }, []);

  useEffect(() => {
    if (
      departmentResponse.length !== 0 &&
      subDepartmentResponse.length !== 0 &&
      roleResponse.length !== 0
    ) {
      setLoading(false);
    }
  }, [departmentResponse, subDepartmentResponse, roleResponse]);

  const handleNavigate = () => {
    console.log("roleId: " + roleId);
    console.log("departmentId: " + departmentId);
    console.log("subDepartmentId: " + subdepartmentId);
    console.log("teamDepartmentId: " + teamDepartmentId);
    console.log("individualDepartmentId: " + individualDepartmentId);

    usersList
      .filter((user) =>
        role !== "President"
          ? user.department === departmentId &&
            user.subdepartment === subdepartmentId &&
            user.sub_subdepartment === teamDepartmentId &&
            user.individuals === individualDepartmentId &&
            user.role === roleId
          : user.department === departmentId &&
            user.subdepartment === subdepartmentId &&
            user.sub_subdepartment === teamDepartmentId &&
            user.individuals === individualDepartmentId
      )
      .map((us) => {
        console.log("userId: " + us.id);
        changeUrlKEY(us.id);
        setUserId(us.id);
        setLoading(true);
        const path = "/dashboard";
        navigate(path);
      });

    HandleError();
  };

  return (
    <main>
      {loading ? (
        <div className="loader-landing">
          {"Loading..."}
          <img className="img-loader big-wrapper" src={loader} />
        </div>
      ) : (
        <div className="big-wrapper light">
          <>
            <header>
              <div className="container">
                <div className="logo">
                  <Bounce>
                    <img src={coop} alt="Logo" />
                  </Bounce>
                </div>
              </div>
            </header>

            <div className="showcase-area">
              <div className="container">
                <div className="left">
                  <div className="big-title">
                    <Bounce>
                      <h1>Planning DashBoard</h1>
                    </Bounce>
                    <h1>Start Exploring now.</h1>
                  </div>
                  <FadeIn>
                    <p className="text">
                      "To be the leading private bank in 2025"
                    </p>
                  </FadeIn>
                  <div className="cta">
                    <div className="form-group">
                      <select
                        id="roleId"
                        className="form-control selecting"
                        onChange={(e) => handleRoleChange(e)}
                      >
                        <option value="select">Select....</option>
                        {roleResponse.map((roles, index) => (
                          <option key={index} value={roles.role_name}>
                            {roles.role_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {role !== "" &&
                    role !== "select" &&
                    role !== "President" &&
                    role !== "admin" && (
                      <div className="cta">
                        <div className="form-group">
                          <select
                            id="departmentId"
                            className="form-control selecting"
                            onChange={(e) => handleDepartmentChange(e)}
                          >
                            <option key="select" value="select">
                              Select....
                            </option>
                            {departments.map((department, index) => (
                              <option key={index}>
                                {department.dept_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                  {(role === "director" ||
                    role === "Manager" ||
                    role === "Individuals") &&
                    department !== "" &&
                    department !== "select" && (
                      <div className="cta">
                        <div className="form-group">
                          <select
                            id="subDepartmentId"
                            className="form-control selecting"
                            onChange={(e) => handleSubDepartmentChange(e)}
                          >
                            <option value="select">Select....</option>
                            {subdepartments
                              .filter((sub) => sub.department === departmentId)
                              .map((subdep, index) => (
                                <option key={index}>{subdep.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                    )}

                  {(role === "Manager" || role === "Individuals") &&
                    subdepartment !== "select" &&
                    subdepartment !== "" && (
                      <div className="cta">
                        <div className="form-group">
                          <select
                            id="teamDepartmentId"
                            className="form-control selecting"
                            onChange={(e) => handleTeamDepartmentChange(e)}
                          >
                            <option value="select">Select....</option>
                            {teamDepartmentResponse
                              .filter(
                                (teamDep) =>
                                  teamDep.subdepartment === subdepartmentId
                              )
                              .map((td, index) => (
                                <option key={index}>{td.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                    )}

                  {role === "Individuals" &&
                    subdepartment !== "select" &&
                    subdepartment !== "" &&
                    teamDepartment !== "select" &&
                    teamDepartment !== "" && (
                      <div className="cta">
                        <div className="form-group">
                          <select
                            id="individualId"
                            className="form-control selecting"
                            onChange={(e) =>
                              handleIndividualDepartmentChange(e)
                            }
                          >
                            <option value="select">Select....</option>
                            {individualDepartmentResponse
                              .filter(
                                (individualDep) =>
                                  individualDep.sub_subdepartment ===
                                  teamDepartmentId
                              )
                              .map((ind, index) => (
                                <option key={index}>{ind.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                    )}

                  <button className="btnl third" onClick={handleNavigate}>
                    MANAGE
                  </button>
                </div>

                <div className="right">
                  <img src={hailes} alt="Person Image" className="person" />
                </div>
              </div>
            </div>

            <div className="bottom-area">
              <div className="container"> </div>
            </div>
          </>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </main>
  );
};
export default LandingPage;
