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
    changeTeamDepartments,
    changeDepartments,
    changeSubDepartments,
    changeRoles,
    changeUsers,
    changeUrlKEY,
  } = useAPI();
  const [loading, setLoading] = useState(true);
  const [departmentResponse, setDepartmentResponse] = useState([]);
  const [subDepartmentResponse, setSubdepartmentResponse] = useState([]);
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [role, setRole] = useState("");
  const [subdepartments, setSubdepartments] = useState([]);
  const [subdepartment, setSubdepartment] = useState("");
  const [subdepartmentId, setSubdepartmentId] = useState(null);
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

  // const handleChange = (e) => {
  //   setDirector(e.target.value);
  // };
  const handleRoleChange = (e) => {
    changeUserType(e.target.value);
    setRole(e.target.value);
    console.log(e.target.value);
    if (e.target.value !== "President" && e.target.value !== "select") {
      setDepartments(departmentResponse);
    } else {
      setDepartments([]);
    }
    if (department !== "select") {
      setSubdepartments(subDepartmentResponse);
    }
    if (e.target.value !== "Director") {
      setSubdepartments([]);
    }
  };

  const handleDepartmentChange = (e) => {
    changeDepartment(e.target.value);
    setDepartment(e.target.value);

    departmentResponse
      .filter((department) => department.dept_name === e.target.value)
      .map((dep) => setDepartmentId(dep.dept_id));

    if (e.target.value !== "select" && role === "Director") {
      setSubdepartments(subDepartmentResponse);
    } else {
      setSubdepartments([]);
    }
    if (role !== "Director") {
      setSubdepartments([]);
    }

    HandleDepartmentId(e.target.value);
  };

  const handleSubDepartmentChange = (e) => {
    changeSubDepartment(e.target.value);
    subDepartmentResponse
      .filter((subdepartment) => subdepartment.name === e.target.value)
      .map((subdep) => setSubdepartmentId(subdep.id));
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
        // setSubdepartmentResponse(res);
        changeTeamDepartments(res);
      });
    fetch("https://pms-apis.herokuapp.com/core/role/")
      .then((response) => response.json())
      .then((res) => {
        changeRoles(res);
      });
    fetch("https://pms-apis.herokuapp.com/core/users/")
      .then((response) => response.json())
      .then((res) => {
        changeUsers(res);
        setUsersList(res);
      });

    if (departmentResponse !== [] && subDepartmentResponse !== []) {
      setLoading(false);
    }
  }, []);

  const handleNavigate = () => {
    const role = document.getElementById("roleId").value;
    const department = document.getElementById("departmentId").value;
    const subDepartment = document.getElementById("subDepartmentId").value;
    console.log("role: " + role);
    console.log("department: " + department);
    console.log("subDepartment: " + subDepartment);

    console.log(departmentId);
        console.log(subdepartmentId);
    usersList
      .filter(
        (user) =>
          user.department === departmentId &&
          user.subdepartment === subdepartmentId
      )
      .map((us) => {
        
        changeUrlKEY(us.id);
        setUserId(us.id);
      });

    if (
      role === "President" &&
      department === "select" &&
      subDepartment === "select"
    ) {
      setLoading(true);
      const path = "/dashboard";
      navigate(path);
    } else if (role === "Vice President" && department !== "select") {
      setLoading(true);
      const path = "/dashboard";
      navigate(path);
    } else if (
      role === "Director" &&
      department !== "select" &&
      subDepartment !== "select"
    ) {
      setLoading(true);
      const path = "/dashboard";
      navigate(path);
    } else {
      HandleError();
    }
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
                        <option>President</option>
                        <option>Vice President</option>
                        <option>Director</option>
                      </select>
                    </div>
                  </div>
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
                          <option key={index}>{department.dept_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

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
