import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAPI } from "../../Context/APIContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify";

const EditDept = () => {
  const location = useLocation();
  const index = location.state.index;
  const filterperspectives = location.state.perspectives;
  const DashboardPage = location.state.dashboardPage;
  const kpis = location.state.kpi;
  const [username, setUsername] = useState("");
  const [usernameId, setUsernameId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [userId, setUserId] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [subDepartmentId, setSubDepartmentId] = useState("");
  const [teamDepartment, setTeamDepartment] = useState("");
  const [teamDepartmentId, setTeamDepartmentId] = useState("");
  const [individualDepartment, setIndividualDepartment] = useState("");
  const [individaulDepartmentId, setIndividualDepartmentId] = useState("");
  const [password, setPassword] = useState("");
  const [Role_Name, setRoleName] = useState("");
  const [Hierarchy, setHierarchy] = useState("");
  const [objective, setObjective] = useState("");
  const [kpiName, setKpiName] = useState("");
  const [kpiWeight, setKpiWeight] = useState("");
  const [kpiTarget, setKpiTarget] = useState("");
  const [perspective, setPerspective] = useState("");
  const [perspectiveWeight, setPerspectiveWeight] = useState("");
  const [objectiveWeight, setObjectiveWeight] = useState("");
  const [kpiUnitMeasurement, setKpiUnitMeasurement] = useState("");
  const [pageType, setPageType] = useState(location.state.page);
  const [ceoPerspective, setCeoPerspective] = useState([]);
  const [ceoPerspectiveId, setCeoPerspectiveId] = useState("");
  const [ceoObjective, setCeoObjective] = useState([]);
  const [ceoObjectiveId, setCeoObjectiveId] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {
    userType,
    useDepartment,
    useSubDepartment,
    useTeamDepartments,
    useUsers,
    useroles,
    usedepartments,
    useSubDepartments,
    addDepartment,
    addSubDepartment,
    addTeamDepartment,
    addRoles,
    addUsers,
    updateDepartment,
    updateSubDepartment,
    updateTeamDepartment,
    updateRoles,
    urlKEY,
  } = useAPI();
  const [url, setUrl] = useState("");
  const perspUrl = `https://pms-apis.herokuapp.com/bsc/perspective/${urlKEY}/`;
  const objUrl = `https://pms-apis.herokuapp.com/bsc/objective/${urlKEY}/`;

  const kpiUrl = `https://pms-apis.herokuapp.com/bsc/kpi/${urlKEY}/`;

  useEffect(() => {
    fetch(perspUrl)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setCeoPerspective(res);
      });

    fetch(objUrl)
      .then((response) => response.json())
      .then((res) => {
        setCeoObjective(res);
      });
  }, []);

  useEffect(() => {
    console.log(
      "SubDepartment " + subDepartment + " with an Id of : " + subDepartmentId
    );
  }, [subDepartment]);

  useEffect(() => {
    if (DashboardPage === "dept") {
      setDepartment(index !== "" ? kpis[index].dept_name : "");
    } else if (DashboardPage === "subDept") {
      setSubDepartment(index !== "" ? kpis[index].name : "");
      setDepartmentId(index !== "" ? kpis[index].department : "");
    } else if (DashboardPage === "sub-subDept") {
      setTeamDepartment(index !== "" ? kpis[index].name : "");
      setSubDepartmentId(index !== "" ? kpis[index].subdepartment : "");
    } else if (DashboardPage === "individualDep") {
      setIndividualDepartment(index !== "" ? kpis[index].name : "");
      setTeamDepartmentId(index !== "" ? kpis[index].sub_subdepartment : "");
    } else if (DashboardPage === "role") {
      setRoleName(index !== "" ? kpis[index].role_name : "");
      setHierarchy(index !== "" ? kpis[index].hierarchy : "");
    } else if (DashboardPage === "user") {
      setUsername(index !== "" ? kpis[index].username : "");
      setFirstName(index !== "" ? kpis[index].first_name : "");
      setLastName(index !== "" ? kpis[index].last_name : "");
      setRoleId(index !== "" ? kpis[index].role: "");
      setDepartmentId(index !== "" ? kpis[index].department : "");
      setSubDepartmentId(index !== "" ? kpis[index].subdepartment : "");
    } else if (DashboardPage === "persp") {
      console.log(kpis);
      setPerspective(index !== "" ? kpis[index].perspective_name : "");
      setPerspectiveWeight(
        index !== "" ? parseFloat(kpis[index].perspective_weight) * 100 : ""
      );
      setUserId(index !== '' ? kpis[index].user : '');
    } else if (DashboardPage === "obj") {
      setObjective(index !== "" ? kpis[index].objective_name : "");
      setObjectiveWeight(
        index !== "" ? parseFloat(kpis[index].objective_weight) * 100 : ""
      );
      setCeoPerspectiveId(index !== "" ? kpis[index].perspective : "");
      setUserId(index !== "" ? kpis[index].user : "");
    } else if (DashboardPage === "kpi") {
      // console.log(kpiname);
      setKpiName(index !== "" ? kpis[index].kpi_name : "");
      console.log();
      setKpiWeight(
        index !== "" ? parseFloat(kpis[index].kpi_weight) * 100 : ""
      );
      setKpiTarget(
        index !== ""
          ? kpis[index].kpi_unit_measurement === "Percentage"
            ? parseFloat(kpis[index].kpi_target) * 100
            : kpis[index].kpi_target
          : ""
      );
      setKpiUnitMeasurement(
        index !== "" ? kpis[index].kpi_unit_measurement : ""
      );
      setCeoPerspectiveId(index !== "" ? kpis[index].perspective : "");
      setCeoObjectiveId(index !== "" ? kpis[index].objective : "");
      setUserId(index !== "" ? kpis[index].user : "");
    }
  }, []);
  const handleAdd = () => {
    if (DashboardPage === "dept") {
      const dept = {
        dept_name: department,
      };
      if (department === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .post("https://pms-apis.herokuapp.com/core/department/", dept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // HandleSuccess();
          alert("Department ADDED Successfully");
          console.log(data);
          addDepartment(data.dept_id, data.dept_name);
          setDepartment("");
        })

        .catch((error) => {
          // HandleError();
          // alert('There was an error!', error);
        });
    } else if (DashboardPage === "subDept") {
      const subDept = {
        name: subDepartment,
        department: departmentId,
      };
      if (departmentId === "" || subDepartment === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .post("https://pms-apis.herokuapp.com/core/subdepartment/", subDept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("SubDepartment ADDED Successfully");
          console.log(data);
          addSubDepartment(data.id, data.name, data.department);
          setSubDepartment("");
          setDepartmentId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "sub-subDept") {
      const teamDept = {
        name: teamDepartment,
        subdepartment: subDepartmentId,
      };
      if (subDepartmentId === "" || teamDepartment === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .post("https://pms-apis.herokuapp.com/core/subsub/", teamDept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Team Department ADDED Successfully");
          console.log(data);
          addTeamDepartment(data.id, data.name, data.subdepartment);
          setTeamDepartment("");
          setSubDepartmentId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "individualDep") {
      const indiDep = {
        name: individualDepartment,
        sub_subdepartment: teamDepartmentId,
      };
      if (individualDepartment === "" || teamDepartmentId === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .post("https://pms-apis.herokuapp.com/core/individual/", indiDep)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Individual Department ADDED Successfully");
          console.log(data);
          setIndividualDepartment("");
          setTeamDepartment("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "role") {
      const role = {
        role_name: Role_Name,
        hierarchy: Hierarchy,
      };

      if(Role_Name === '' || Hierarchy === ''){
        setDisplayError(true);
        return;
      }else{
        setDisplayError(false);
      }

      axios
        .post("https://pms-apis.herokuapp.com/core/role/", role)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Role ADDED Successfully");
          console.log(data);
          addRoles(data.role_id, data.role_name, data.hierarchy);
          setRoleName("");
          setHierarchy("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "user") {
      const user = {
        first_name: firstName,
        last_name: lastname,
        username: username,
        role: roleId,
        department: departmentId,
        subdepartment: subDepartmentId,
        password: password,
      };
      console.log(user);
      if (
        username === "" ||
        roleId === "" ||
        departmentId === "" ||
        subDepartmentId === ""
      ){
        setDisplayError(true);
        return;
      }else {
        setPasswordError(false);
        setDisplayError(false);
      }
       if(password.length < 8){
        setPasswordError(true);
        return;
      }
       else {
        setPasswordError(false);
        setDisplayError(false);
      }
      axios
        .post("https://pms-apis.herokuapp.com/core/auth/register/", user)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("User ADDED Successfully");
          console.log(data);
          setUsername("");
          setFirstName("");
          setLastName("");
          setRole("");
          setDepartment("");
          setSubDepartment("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "persp") {
      const persp = {
        perspective_name: perspective,
        perspective_weight: perspectiveWeight,
        user: userId,
      };
      console.log(persp);
      if (userId === "" || perspective === "" || perspectiveWeight === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .post(
          `https://pms-apis.herokuapp.com/bsc/perspective/${urlKEY}/`,
          persp
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Perspective ADDED Successfully");
          console.log(data);
          setPerspective("");
          setPerspectiveWeight("");
          setUserId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "obj") {
      const objects = {
        objective_name: objective,
        objective_weight: objectiveWeight,
        perspective: ceoPerspectiveId,
        user: userId,
      };
      console.log(objects);
      if (ceoPerspectiveId === "" || userId === "" || objective === '' || objectiveWeight === '') {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .post(
          `https://pms-apis.herokuapp.com/bsc/objective/${urlKEY}/`,
          objects
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Objective ADDED Successfully");
          setObjective("");
          setObjectiveWeight("");
          setPerspective("");
          setUserId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "kpi") {
      const kpi = {
        objective: ceoObjectiveId,
        kpi_name: kpiName,
        kpi_weight: kpiWeight,
        kpi_target: kpiTarget,
        perspective: ceoPerspectiveId,
        kpi_unit_measurement: kpiUnitMeasurement,
        user: userId,
      };
      console.log(kpi);
      if (
        kpiName === "" ||
        kpiWeight === "" ||
        kpiTarget === "" ||
        userId === "" ||
        kpiUnitMeasurement === "" ||
        ceoPerspectiveId === "" ||
        ceoObjectiveId === ""
      ) {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .post(kpiUrl, kpi)
        .then((res) => {
          console.log(res);
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("KPI ADDED Successfully");
          console.log(data);
          setObjective("");
          setKpiName("");
          setKpiWeight("");
          setKpiTarget("");
          setPerspective("");
          setKpiUnitMeasurement("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    }
  };
  const handleSave = () => {
    if (DashboardPage === "dept") {
      const dept = {
        dept_name: department,
      };
      if (department === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/core/department/${kpis[index].dept_id}/`,
          dept
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            console.log(data);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Department UPDATE Successful");
          console.log(data);
          const dept_id = data.dept_id;
          const dept_name = data.dept_name;
          updateDepartment(dept_id, { dept_id, dept_name });
          setDepartment("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "subDept") {
      const subDept = {
        name: subDepartment,
        department: departmentId,
      };
      if (departmentId === "" || subDepartment === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/core/subdepartment_detail/${kpis[index].id}/`,
          subDept
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("SubDepartment UPDATE Successful");
          console.log(data);
          const id = data.id;
          const name = data.name;
          const department = data.department;
          updateSubDepartment(id, { id, name, department });
          setSubDepartment("");
          setDepartmentId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "sub-subDept") {
      const teamDept = {
        name: teamDepartment,
        subdepartment: subDepartmentId,
      };
      if (subDepartmentId === "" || teamDepartment === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/core/subsub/${kpis[index].id}/`,
          teamDept
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Team Department UPDATE Successful");
          console.log(data);
          const id = data.id;
          const name = data.name;
          const subdepartment = data.subdepartment;
          updateTeamDepartment(id, { id, name, subdepartment });
          setTeamDepartment("");
          setSubDepartmentId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    }else if (DashboardPage === "individualDep") {
      const indiDep = {
        name: individualDepartment,
        sub_subdepartment: teamDepartmentId,
      };
      if (individualDepartment === "" || teamDepartmentId === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .put(`https://pms-apis.herokuapp.com/core/individual/${kpis[index].id}/`, indiDep)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            console.log(res);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Individual Department UPDATE Successful");
          console.log(data);
          setIndividualDepartment("");
          setTeamDepartment("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
      } 
    else if (DashboardPage === "role") {
      const role = {
        role_name: Role_Name,
        hierarchy: Hierarchy,
      };
      if(Role_Name === '' || Hierarchy === ''){
        setDisplayError(true);
        return;
      }else{
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/core/role_detail/${kpis[index].role_id}/`,
          role
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Role UPDATE Successful");
          console.log(data);
          const role_id = data.role_id;
          const role_name = data.role_name;
          const hierarchy = data.hierarchy;
          updateRoles(role_id, { role_id, role_name, hierarchy });
          setRoleName("");
          setHierarchy("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "user") {
      const user = {
        first_name: firstName,
        last_name: lastname,
        username: username,
        role: roleId,
        department: departmentId,
        subdepartment: subDepartmentId,
        password: password,
      };
      console.log(user);
      if (
        username === "" ||
        roleId === "" ||
        departmentId === "" ||
        subDepartmentId === ""
      ){
        setDisplayError(true);
        return;
      }else {
        setPasswordError(false);
        setDisplayError(false);
      } if(password.length < 8){
        setPasswordError(true);
        return;
      }
       else {
        setPasswordError(false);
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/core/user/${kpis[index].id}/`,
          user
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            console.log(res);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          console.log(res);
          alert("User UPDATE Successful");
          setUsername("");
          setFirstName("");
          setLastName("");
          setRole("");
          setDepartment("");
          setSubDepartment("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "persp") {
      const persp = {
        perspective_name: perspective,
        perspective_weight: perspectiveWeight,
        user: userId,
      };
      console.log(persp);
      if (userId === "" || perspective === "" || perspectiveWeight === "") {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/bsc/perspective/${kpis[index].perspective_id}/`,
          persp
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Perspective UPDATE Successful");
          setPerspective("");
          setPerspectiveWeight("");
          setUserId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "obj") {
      const obj = {
        objective_name: objective,
        objective_weight: objectiveWeight,
        perspective: ceoPerspectiveId,
        user: userId,
      };
      console.log(obj);
      if (ceoPerspectiveId === "" || userId === "" || objective === '' || objectiveWeight === '') {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/bsc/objective/${kpis[index].objective_id}/`,
          obj
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("Objective UPDATE Successful");
          setObjective("");
          setObjectiveWeight("");
          setPerspective("");
          setUserId("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    } else if (DashboardPage === "kpi") {
      const kpi = {
        objective: ceoObjectiveId,
        kpi_name: kpiName,
        kpi_weight: kpiWeight,
        kpi_target: kpiTarget,
        perspective: ceoPerspectiveId,
        kpi_unit_measurement: kpiUnitMeasurement,
        user: userId,
      };
      console.log(kpi);
      if (
        kpiName === "" ||
        kpiWeight === "" ||
        kpiTarget === "" ||
        userId === "" ||
        kpiUnitMeasurement === "" ||
        ceoPerspectiveId === "" ||
        ceoObjectiveId === ""
      ) {
        setDisplayError(true);
        return;
      } else {
        setDisplayError(false);
      }
      axios
        .put(
          `https://pms-apis.herokuapp.com/bsc/kpi/${kpis[index].kpi_id}/`,
          kpi
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            console.log(res);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          alert("KPI UPDATE Successful");
          setObjective("");
          setKpiName("");
          setKpiWeight("");
          setKpiTarget("");
          setPerspective("");
          setKpiUnitMeasurement("");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    }
  };

  const handleDelete = () => {
    // setDepartmentName('');
    // fetch(`https://bsc-newapi.herokuapp.com/core/department/`)
    //   .then((res) => {
    //     const data = res.json();
    //     if (!res.ok) {
    //       const error = (data && data.message) || res.status;
    //       return Promise.reject(error);
    //     }
    //     alert('Delete Successful');
    //   })
    //   .catch((error) => {
    //     alert('There was an error!', error);
    //   });
  };

  const HandleError = () => {
    toast.error("Department is required!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const HandleSuccess = () => {
    toast.success("Department Added Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handlePerspectiveChange = (e) => {
    setPerspective(e.target.value);
    if (e.target.value === "select") {
      setCeoPerspectiveId("Select");
    }
    ceoPerspective
      .filter((persp) => persp.perspective_name === e.target.value)
      .map((p) => setCeoPerspectiveId(p.perspective_id));
  };
  const handleObjectiveChange = (e) => {
    setObjective(e.target.value);
    if (e.target.value === "select") {
      setCeoObjectiveId("Select");
    }
    ceoObjective
      .filter((objective) => objective.objective_name === e.target.value)
      .map((obj) => setCeoObjectiveId(obj.objective_id));
  };

  const handleUserChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value === "select") {
      setUserId("Select");
    }
    useUsers
      .filter((user) => user.username === e.target.value)
      .map((us) => setUserId(us.id));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value === "select") {
      setRoleId("Select");
    }
    useroles
      .filter((rol) => rol.role_name === e.target.value)
      .map((r) => setRoleId(r.role_id));
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    if (e.target.value === "select") {
      setDepartmentId("Select");
    }
    usedepartments
      .filter((dep) => dep.dept_name === e.target.value)
      .map((d) => setDepartmentId(d.dept_id));
  };

  const handleSubDepartmentChange = (e) => {
    setSubDepartment(e.target.value);
    if (e.target.value === "select") {
      setSubDepartmentId("Select");
    }
    useSubDepartments
      .filter((subDep) => subDep.name === e.target.value)
      .map((sub) => setSubDepartmentId(sub.id));
  };
  const handleTeamDepartmentChange = (e) => {
    setTeamDepartment(e.target.value);
    if (e.target.value === "select") {
      setTeamDepartment("Select");
    }
    useTeamDepartments
      .filter((teamDep) => teamDep.name === e.target.value)
      .map((td) => setTeamDepartmentId(td.id));
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="Container">
      <div className="header">
        {pageType !== "ADD" && DashboardPage === "dept"
          ? "Edit Department"
          : DashboardPage === "dept"
          ? "Add Department"
          : null}
        {pageType !== "ADD" && DashboardPage === "user"
          ? "Edit User"
          : DashboardPage === "user"
          ? "Add User"
          : null}
        {pageType !== "ADD" && DashboardPage === "role"
          ? "Edit Role"
          : DashboardPage === "role"
          ? "Add Role"
          : null}
        {pageType !== "ADD" && DashboardPage === "obj"
          ? "Edit Objective"
          : DashboardPage === "obj"
          ? "Add Objective"
          : null}
        {pageType !== "ADD" && DashboardPage === "persp"
          ? "Edit Perspective"
          : DashboardPage === "persp"
          ? "Add Perspective"
          : null}
        {pageType !== "ADD" && DashboardPage === "kpi"
          ? "Edit KPI"
          : DashboardPage === "kpi"
          ? "Add KPI"
          : null}
      </div>

      <div className="InputContainer">
        <form
          onSubmit={handleSubmit(pageType === "ADD" ? handleAdd : handleSave)}
        >
          {DashboardPage === "dept" && (
            <>
              <span style={{ fontSize: "1.5rem" }}> Department: </span>
              <input
                className="DeptInput"
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
              />
              {displayError && (
                <span className="errorStyle">This field is required</span>
              )}
            </>
          )}
          {DashboardPage === "subDept" && (
            <>
              <div>
                <span style={{ fontSize: "1.5rem" }}> SubDepartment: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setSubDepartment(e.target.value)}
                  value={subDepartment}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Department: </span>

                <select
                  id="subDepartment"
                  name="message"
                  onChange={(e) => handleDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {usedepartments.map((dep, index) => (
                    <option key={index} value={dep.dept_name}>
                      {dep.dept_name}
                    </option>
                  ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
            </>
          )}
          {DashboardPage === "sub-subDept" && (
            <>
              <div>
                <span style={{ fontSize: "1.5rem" }}> Team Department: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setTeamDepartment(e.target.value)}
                  value={teamDepartment}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Sub-Departments: </span>

                <select
                  id="subDepartment"
                  name="message"
                  onChange={(e) => handleSubDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useSubDepartments.map((dep, index) => (
                    <option key={index} value={dep.name}>
                      {dep.name}
                    </option>
                  ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
            </>
          )}
          {DashboardPage === "individualDep" && (
            <>
              <div>
                <span style={{ fontSize: "1.5rem" }}> Individual Department: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setIndividualDepartment(e.target.value)}
                 value={individualDepartment}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Team Department: </span>

                <select
                  id="subDepartment"
                  name="message"
                  onChange={(e) => handleTeamDepartmentChange(e)}
                  value={teamDepartment}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useTeamDepartments.map((teamDep, index) => (
                    <option key={index} value={teamDep.name}>
                      {teamDep.name}
                    </option>
                  ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
            </>
          )}
          {DashboardPage === "role" && (
            <div className="InputFields">
              <div>
                <span style={{ fontSize: "1.5rem" }}> Role Name: </span>
                <input
                  className="RoleInput"
                  onChange={(e) => setRoleName(e.target.value)}
                  value={Role_Name}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Hierarchy: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  style={{ width: "50px" }}
                  onChange={(e) => setHierarchy(e.target.value)}
                  value={Hierarchy}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
            </div>
          )}

          {DashboardPage === "user" && (
            <div className="InputFields">
              <div>
                <span style={{ fontSize: "1.5rem" }}> UserName: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> First Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Last Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastname}
                />
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Role: </span>

                <select id="userRole" onChange={(e) => handleRoleChange(e)}>
                  <option key="select" value="select">
                    Select
                  </option>
                  {useroles.map((role, index) => (
                    <option key={index} value={role.role_name}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Department: </span>
                <select
                  id="userDepartment"
                  onChange={(e) => handleDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {usedepartments.map((dep, index) => (
                    <option key={index} value={dep.dept_name}>
                      {dep.dept_name}
                    </option>
                  ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> SubDepartment: </span>
                <select
                  id="userSubDepartment"
                  onChange={(e) => handleSubDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useSubDepartments
                    .filter((sub) => sub.department === departmentId)
                    .map((subDep, index) => (
                      <option key={index} value={subDep.name}>
                        {subDep.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Password: </span>
                <input
                  id="HierarchyInput"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {passwordError && (
                  <span className="errorStyle">
                    Password must be greater than 8 characters.
                  </span>
                )}
              </div>
            </div>
          )}

          {DashboardPage === "kpi" && (
            <div className="InputFields">
              <div>
                <span style={{ fontSize: "1.5rem" }}> KPI Name: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => setKpiName(e.target.value)}
                  value={kpiName}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> KPI Weight: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiWeight(e.target.value)}
                  value={kpiWeight}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> KPI Target: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiTarget(e.target.value)}
                  value={kpiTarget}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}>
                  {" "}
                  KPI Unit of Measurement:{" "}
                </span>
                <select
                  id="unitofmeasurement"
                  onChange={(e) => setKpiUnitMeasurement(e.target.value)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  <option key="percent" value="Percentage">
                    Percentage
                  </option>
                  <option key="numbers" value="Numbers">
                    Number
                  </option>
                  <option key="etb" value="ETB">
                    ETB
                  </option>
                  <option key="USD" value="USD">
                    USD
                  </option>
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Perspective: </span>
                <select
                  id="kpiPerspective"
                  onChange={(e) => handlePerspectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoPerspective.map((perspect, index) => (
                    <option key={index} value={perspect.perspective_name}>
                      {perspect.perspective_name}
                    </option>
                  ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Objective: </span>
                <select
                  id="kpiObjective"
                  onChange={(e) => handleObjectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoObjective
                    .filter((obj) => obj.perspective === ceoPerspectiveId)
                    .map((objec, index) => (
                      <option key={index} value={objec.objective_name}>
                        {objec.objective_name}
                      </option>
                    ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
              <div>
                <span style={{ fontSize: "1.5rem" }}> User: </span>
                <select id="kpiUser" onChange={(e) => handleUserChange(e)}>
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) => u.id === filterperspectives[0].user)
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
            </div>
          )}

          {DashboardPage === "persp" && (
            <div className="InputFields">
              <div>
                <span style={{ fontSize: "1.5rem" }}> Perspective Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => handlePerspectiveChange(e)}
                  value={perspective}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}>
                  {" "}
                  Perspective Weight:{" "}
                </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setPerspectiveWeight(e.target.value)}
                  value={perspectiveWeight}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> User: </span>
                <select id="objUsers" onChange={(e) => handleUserChange(e)}>
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) => u.id === filterperspectives[0].user)
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
            </div>
          )}

          {DashboardPage === "obj" && (
            <div className="InputFields">
              <div>
                <span style={{ fontSize: "1.5rem" }}> Objective Name: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => handleObjectiveChange(e)}
                  value={objective}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Objective Weight: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setObjectiveWeight(e.target.value)}
                  value={objectiveWeight}
                />
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> Perspective: </span>

                <select
                  id="objPerspective"
                  onChange={(e) => handlePerspectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoPerspective.map((perspect, index) => (
                    <option key={index} value={perspect.perspective_name}>
                      {perspect.perspective_name}
                    </option>
                  ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>

              <div>
                <span style={{ fontSize: "1.5rem" }}> User: </span>

                <select id="objUsers" onChange={(e) => handleUserChange(e)}>
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) => u.id === filterperspectives[0].user)
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
                {displayError && (
                  <span className="errorStyle">This field is required</span>
                )}
              </div>
            </div>
          )}

          {pageType === "ADD" && <button className="btn saveadd">ADD</button>}
          {pageType !== "ADD" && <button className="btn saveadd">SAVE</button>}

          <button className="btn delete">DELETE</button>
        </form>
      </div>
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
  );
};
export default EditDept;
