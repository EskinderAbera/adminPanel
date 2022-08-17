import React, { useContext, useState, createContext } from "react";

const APIContext = createContext();
export function APIContextProvider({ children }) {
  const [userType, setUserType] = useState("");
  const [useDepartment, setDepartment] = useState("");
  const [useSubDepartment, setSubDepartment] = useState("");
  const [usedepartments, setDepartments] = useState([]);
  const [useSubDepartments, setSubDepartments] = useState([]);
  const [useTeamDepartments, setTeamDepartments] = useState([]);
  const [useroles, setRoles] = useState([]);
  const [useUsers, setUsers] = useState([]);
  const [urlKEY, setUrlKEY] = useState("");
  const changeUserType = (user) => {
    setUserType(user);
  };
  const changeDepartment = (department) => {
    setDepartment(department);
  };

  const changeSubDepartment = (subdepartment) => {
    setSubDepartment(subdepartment);
  };
  const changeRoles = (roles) => {
    setRoles(roles);
  };
  const changeDepartments = (department) => {
    setDepartments(department);
  };

  const changeSubDepartments = (subDepartment) => {
    setSubDepartments(subDepartment);
  };

  const changeTeamDepartments = (teamDep) => {
    setTeamDepartments(teamDep);
  };

  const changeUsers = (users) => {
    setUsers(users);
  };
  const changeUrlKEY = (url) => {
    setUrlKEY(url);
  };

  const addDepartment = (dept_id, dept_name) => {
    setDepartments([
      ...usedepartments,
      {
        dept_id,
        dept_name,
      },
    ]);
  };

  const updateDepartment = (dept_id, updatedDepartment) => {
    setDepartments(usedepartments.map((dep) => dep.dept_id === dept_id ? updatedDepartment : dep))
}

  const addSubDepartment = (id, name, department) => {
    setSubDepartments([
      ...useSubDepartments,
      {
        id,
        name,
        department,
      },
    ]);
  };

  const updateSubDepartment = (id, updatedSubDepartment) => {
    setSubDepartments(useSubDepartments.map((Subdep) => Subdep.id === id ? updatedSubDepartment : Subdep))
}

  const addTeamDepartment = (id, name, subdepartment) => {
    setTeamDepartments([
      ...useTeamDepartments,
      {
        id,
        name,
        subdepartment,
      },
    ]);
  };

  const updateTeamDepartment = (id, updatedTeamDepartment) => {
    setTeamDepartments(useTeamDepartments.map((teamDep) => teamDep.id === id ? updateTeamDepartment : teamDep))
}

  const addRoles = (role_id, role_name, hierarchy) => {
    setRoles([
      ...useroles,
      {
        role_id,
        role_name,
        hierarchy,
      },
    ]);
  };

  const updateRoles = (role_id, updatedRoles) => {
    setRoles(useroles.map((rol) => rol.role_id === role_id ? updatedRoles : rol))
}
  const addUsers = (
    id,
    first_name,
    last_name,
    username,
    role,
    department,
    subdepartment,
    sub_subdepartment,
    is_active
  ) => {
    setUsers([
      ...useUsers,
      {
        id,
        first_name,
        last_name,
        username,
        role,
        department,
        subdepartment,
        sub_subdepartment,
        is_active,
      },
    ]);
  };
  return (
    <APIContext.Provider
      value={{
        useDepartment,
        useSubDepartment,
        userType,
        usedepartments,
        useroles,
        useSubDepartments,
        useTeamDepartments,
        useUsers,
        urlKEY,
        changeUserType,
        changeDepartment,
        changeSubDepartment,
        changeTeamDepartments,
        changeDepartments,
        changeRoles,
        changeSubDepartments,
        changeUsers,
        changeUrlKEY,
        addDepartment,
        addSubDepartment,
        addTeamDepartment,
        addRoles,
        addUsers,
        updateDepartment,
        updateSubDepartment,
        updateTeamDepartment,
        updateRoles
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
