import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAPI } from "../../Context/APIContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify";

const EditDept = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [passwordError, setPasswordError] = useState(false);
  const {
    userType,
    useDepartment,
    useSubDepartment,
    useTeamDepartments,
    useIndividualDepartments,
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
    console.log("filterperspectives");
    console.log(filterperspectives);
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
      setRoleId(index !== "" ? kpis[index].role : "");
      setDepartmentId(index !== "" ? kpis[index].department : "");
      setSubDepartmentId(index !== "" ? kpis[index].subdepartment : "");
      setTeamDepartmentId(index !== "" ? kpis[index].sub_subdepartment : "");
      setIndividualDepartmentId(index !== "" ? kpis[index].individuals : "");
    } else if (DashboardPage === "persp") {
      console.log(kpis);
      setPerspective(index !== "" ? kpis[index].perspective_name : "");
      setPerspectiveWeight(
        index !== "" ? parseFloat(kpis[index].perspective_weight) * 100 : ""
      );
      setUserId(index !== "" ? kpis[index].user : "");
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
      axios
        .post("https://pms-apis.herokuapp.com/core/department/", dept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // HandleSuccess();
          // alert("Department ADDED Successfully");
          HandleSuccess("Department");
          console.log(data);
          addDepartment(data.dept_id, data.dept_name);
          setDepartment("");
        })

        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "subDept") {
      const subDept = {
        name: subDepartment,
        department: departmentId,
      };
      axios
        .post("https://pms-apis.herokuapp.com/core/subdepartment/", subDept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // alert("SubDepartment ADDED Successfully");
          HandleSuccess("SubDepartment");
          console.log(data);
          addSubDepartment(data.id, data.name, data.department);
          setSubDepartment("");
          setDepartmentId("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "sub-subDept") {
      const teamDept = {
        name: teamDepartment,
        subdepartment: subDepartmentId,
      };
      axios
        .post("https://pms-apis.herokuapp.com/core/subsub/", teamDept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // alert("Team Department ADDED Successfully");
          HandleSuccess("Team Department");
          console.log(data);
          addTeamDepartment(data.id, data.name, data.subdepartment);
          setTeamDepartment("");
          setSubDepartmentId("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "individualDep") {
      const indiDep = {
        name: individualDepartment,
        sub_subdepartment: teamDepartmentId,
      };
      axios
        .post("https://pms-apis.herokuapp.com/core/individual/", indiDep)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // alert("Individual Department ADDED Successfully");
          HandleSuccess("Team Department");
          console.log(data);
          setIndividualDepartment("");
          setTeamDepartment("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "role") {
      const role = {
        role_name: Role_Name,
        hierarchy: Hierarchy,
      };

      axios
        .post("https://pms-apis.herokuapp.com/core/role/", role)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // alert("Role ADDED Successfully");
          HandleSuccess("Role");
          console.log(data);
          addRoles(data.role_id, data.role_name, data.hierarchy);
          setRoleName("");
          setHierarchy("");
        })
        .catch((error) => {
          // alert("There was an error!", error);
          HandleError();
        });
    } else if (DashboardPage === "user") {
      const user = {
        first_name: firstName,
        last_name: lastname,
        username: username,
        role: roleId,
        department: departmentId,
        subdepartment: subDepartmentId,
        sub_subdepartment: teamDepartmentId,
        individuals: individaulDepartmentId,
        password: password,
      };
      console.log(user);
      axios
        .post("https://pms-apis.herokuapp.com/core/auth/register/", user)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // alert("User ADDED Successfully");
          HandleSuccess("User");
          console.log(data);
          setUsername("");
          setFirstName("");
          setLastName("");
          setRole("");
          setDepartment("");
          setSubDepartment("");
          setTeamDepartment("");
          setIndividualDepartment("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "persp") {
      const persp = {
        perspective_name: perspective,
        perspective_weight: perspectiveWeight,
        user: userId,
      };
      console.log(persp);
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
          // alert("Perspective ADDED Successfully");
          HandleSuccess("Perspective");
          console.log(data);
          setPerspective("");
          setPerspectiveWeight("");
          setUserId("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "obj") {
      const objects = {
        objective_name: objective,
        objective_weight: objectiveWeight,
        perspective: ceoPerspectiveId,
        user: userId,
      };
      console.log(objects);
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
          HandleSuccess("Objective");
          setObjective("");
          setObjectiveWeight("");
          setPerspective("");
          setUserId("");
        })
        .catch((error) => {
          HandleError();
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
      axios
        .post(kpiUrl, kpi)
        .then((res) => {
          console.log(res);
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          HandleSuccess("KPI");
          console.log(data);
          setObjective("");
          setKpiName("");
          setKpiWeight("");
          setKpiTarget("");
          setPerspective("");
          setKpiUnitMeasurement("");
        })
        .catch((error) => {
          HandleError();
        });
    }
  };
  const handleSave = () => {
    if (DashboardPage === "dept") {
      const dept = {
        dept_name: department,
      };
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
          HandleSuccessUpdate("Department");
          console.log(data);
          const dept_id = data.dept_id;
          const dept_name = data.dept_name;
          updateDepartment(dept_id, { dept_id, dept_name });
          setDepartment("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "subDept") {
      const subDept = {
        name: subDepartment,
        department: departmentId,
      };
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
          HandleSuccessUpdate("Subdepartment");
          console.log(data);
          const id = data.id;
          const name = data.name;
          const department = data.department;
          updateSubDepartment(id, { id, name, department });
          setSubDepartment("");
          setDepartmentId("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "sub-subDept") {
      const teamDept = {
        name: teamDepartment,
        subdepartment: subDepartmentId,
      };
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
          HandleSuccessUpdate("Team Department");
          console.log(data);
          const id = data.id;
          const name = data.name;
          const subdepartment = data.subdepartment;
          updateTeamDepartment(id, { id, name, subdepartment });
          setTeamDepartment("");
          setSubDepartmentId("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "individualDep") {
      const indiDep = {
        name: individualDepartment,
        sub_subdepartment: teamDepartmentId,
      };
      axios
        .put(
          `https://pms-apis.herokuapp.com/core/individual/${kpis[index].id}/`,
          indiDep
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            console.log(res);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          HandleSuccessUpdate("Individual Department");
          console.log(data);
          setIndividualDepartment("");
          setTeamDepartment("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "role") {
      const role = {
        role_name: Role_Name,
        hierarchy: Hierarchy,
      };
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
          HandleSuccessUpdate("Role");
          console.log(data);
          const role_id = data.role_id;
          const role_name = data.role_name;
          const hierarchy = data.hierarchy;
          updateRoles(role_id, { role_id, role_name, hierarchy });
          setRoleName("");
          setHierarchy("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "user") {
      const user = {
        first_name: firstName,
        last_name: lastname,
        username: username,
        role: roleId,
        department: departmentId,
        subdepartment: subDepartmentId,
        sub_subdepartment: teamDepartmentId,
        individuals: individaulDepartmentId,
      };
      console.log(user);
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
          HandleSuccessUpdate("User");
          setUsername("");
          setFirstName("");
          setLastName("");
          setRole("");
          setDepartment("");
          setSubDepartment("");
          setTeamDepartment("");
          setIndividualDepartment("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "persp") {
      const persp = {
        perspective_name: perspective,
        perspective_weight: perspectiveWeight,
        user: userId,
      };
      console.log(persp);
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
          HandleSuccessUpdate("Perspective");
          setPerspective("");
          setPerspectiveWeight("");
          setUserId("");
        })
        .catch((error) => {
          HandleError();
        });
    } else if (DashboardPage === "obj") {
      const obj = {
        objective_name: objective,
        objective_weight: objectiveWeight,
        perspective: ceoPerspectiveId,
        user: userId,
      };
      console.log(obj);
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
          HandleSuccessUpdate("Objective");
          setObjective("");
          setObjectiveWeight("");
          setPerspective("");
          setUserId("");
        })
        .catch((error) => {
          HandleError();
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
          HandleSuccessUpdate("KPI");
          setObjective("");
          setKpiName("");
          setKpiWeight("");
          setKpiTarget("");
          setPerspective("");
          setKpiUnitMeasurement("");
        })
        .catch((error) => {
          HandleError();
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
    toast.error("Please Fill all the required fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const HandleSuccess = (name) => {
    toast.success(`${name} Added Successfully`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => navigate(-1),
    });
  };
  const HandleSuccessUpdate = (name) => {
    toast.success(`${name} Updated Successfully`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => navigate(-1),
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

    setCeoObjectiveId("");
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
    setSubDepartmentId("");
  };

  const handleSubDepartmentChange = (e) => {
    setSubDepartment(e.target.value);
    if (e.target.value === "select") {
      setSubDepartmentId("Select");
    }
    useSubDepartments
      .filter((subDep) => subDep.name === e.target.value)
      .map((sub) => setSubDepartmentId(sub.id));
    setTeamDepartmentId("");
  };
  const handleTeamDepartmentChange = (e) => {
    setTeamDepartment(e.target.value);
    if (e.target.value === "select") {
      setTeamDepartmentId("Select");
    }
    useTeamDepartments
      .filter((teamDep) => teamDep.name === e.target.value)
      .map((td) => setTeamDepartmentId(td.id));
    setIndividualDepartmentId("");
  };
  const handleIndividualDepartmentChange = (e) => {
    setIndividualDepartment(e.target.value);
    if (e.target.value === "select") {
      setIndividualDepartmentId("Select");
    }
    useIndividualDepartments
      .filter((teamDep) => teamDep.name === e.target.value)
      .map((td) => setIndividualDepartmentId(td.id));
  };
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
              <span> Department: </span>
              <input
                className="DeptInput"
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
              />
            </>
          )}
          {DashboardPage === "subDept" && (
            <>
              <div>
                <span> SubDepartment: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setSubDepartment(e.target.value)}
                  value={subDepartment}
                />
              </div>

              <div>
                <span> Department: </span>

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
              </div>
            </>
          )}
          {DashboardPage === "sub-subDept" && (
            <>
              <div>
                <span> Team Department: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setTeamDepartment(e.target.value)}
                  value={teamDepartment}
                />
              </div>

              <div>
                <span> Sub-Departments: </span>

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
              </div>
            </>
          )}
          {DashboardPage === "individualDep" && (
            <>
              <div>
                <span>
                  {" "}
                  Individual Department:{" "}
                </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setIndividualDepartment(e.target.value)}
                  value={individualDepartment}
                />
              </div>

              <div>
                <span> Team Department: </span>

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
              </div>
            </>
          )}
          {DashboardPage === "role" && (
            <div className="InputFields">
              <div>
                <span> Role Name: </span>
                <input
                  className="RoleInput"
                  onChange={(e) => setRoleName(e.target.value)}
                  value={Role_Name}
                />
              </div>

              <div>
                <span> Hierarchy: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  style={{ width: "50px" }}
                  onChange={(e) => setHierarchy(e.target.value)}
                  value={Hierarchy}
                />
              </div>
            </div>
          )}

          {DashboardPage === "user" && (
            <div className="InputFields">
              <div>
                <span> UserName: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>

              <div>
                <span> First Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>

              <div>
                <span> Last Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastname}
                />
              </div>

              <div>
                <span> Role: </span>

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
              </div>

              <div>
                <span> Department: </span>
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
              </div>

              <div>
                <span> SubDepartment: </span>
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
                <span> Team Department: </span>
                <select
                  id="teamDepartment"
                  onChange={(e) => handleTeamDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useTeamDepartments
                    .filter((td) => td.subdepartment === subDepartmentId)
                    .map((t, index) => (
                      <option key={index} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <span>
                  {" "}
                  Individual Department:{" "}
                </span>
                <select
                  id="individualDepartment"
                  onChange={(e) => handleIndividualDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useIndividualDepartments
                    .filter((id) => id.sub_subdepartment === teamDepartmentId)
                    .map((i, index) => (
                      <option key={index} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <span> Password: </span>
                <input
                  id="HierarchyInput"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
          )}

          {DashboardPage === "kpi" && (
            <div className="InputFields">
              <div>
                <span > KPI Name: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => setKpiName(e.target.value)}
                  value={kpiName}
                />
              </div>

              <div>
                <span> KPI Weight: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiWeight(e.target.value)}
                  value={kpiWeight}
                />
              </div>

              <div>
                <span> KPI Target: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiTarget(e.target.value)}
                  value={kpiTarget}
                />
              </div>

              <div>
                <span>
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
              </div>

              <div>
                <span> Perspective: </span>
                <select
                  id="kpiPerspective"
                  onChange={(e) => handlePerspectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoPerspective.length !== 0 &&
                    ceoPerspective.map((perspect, index) => (
                      <option key={index} value={perspect.perspective_name}>
                        {perspect.perspective_name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <span> Objective: </span>
                <select
                  id="kpiObjective"
                  onChange={(e) => handleObjectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoObjective.length !== 0 &&
                    ceoObjective
                      .filter((obj) => obj.perspective === ceoPerspectiveId)
                      .map((objec, index) => (
                        <option key={index} value={objec.objective_name}>
                          {objec.objective_name}
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <span> User: </span>
                <select id="kpiUser" onChange={(e) => handleUserChange(e)}>
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) =>
                      filterperspectives.length !== 0
                        ? u.id === filterperspectives[0].user
                        : u.id !== null
                    )
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {DashboardPage === "persp" && (
            <div className="InputFields">
              <div>
                <span> Perspective Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => handlePerspectiveChange(e)}
                  value={perspective}
                />
              </div>

              <div>
                <span>
                  {" "}
                  Perspective Weight:{" "}
                </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setPerspectiveWeight(e.target.value)}
                  value={perspectiveWeight}
                />
              </div>

              <div>
                <span> User: </span>
                <select id="objUsers" onChange={(e) => handleUserChange(e)}>
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) =>
                      filterperspectives.length !== 0
                        ? u.id === filterperspectives[0].user
                        : u.id !== null
                    )
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {DashboardPage === "obj" && (
            <div className="InputFields">
              <div>
                <span> Objective Name: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => handleObjectiveChange(e)}
                  value={objective}
                />
              </div>

              <div>
                <span> Objective Weight: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setObjectiveWeight(e.target.value)}
                  value={objectiveWeight}
                />
              </div>

              <div>
                <span> Perspective: </span>

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
              </div>

              <div>
                <span> User: </span>

                <select id="objUsers" onChange={(e) => handleUserChange(e)}>
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) =>
                      filterperspectives.length !== 0
                        ? u.id === filterperspectives[0].user
                        : u.id !== null
                    )
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
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
