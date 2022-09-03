import React from "react";

export const SidebarData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <i className="fa-solid fa-house-chimney"></i>,
  },
  {
    title: "Pages",
    icon: <i className="fa-brands fa-codepen"></i>,
    iconClosed: <i className="fa-solid fa-caret-down"></i>,
    iconOpened: <i className="fa-solid fa-caret-up"></i>,

    subNav: [
      {
        title: "Processes",
        path: "/dept",
        page: "dept",
        icon: "",
      },
      {
        title: "Sub-Processes",
        path: "/subDepartment",
        page: "subDept",
        icon: "",
      },
      {
        title: "Head Office Teams / Branchs",
        path: "/teamDepartment",
        page: "sub-subDept",
        icon: "",
      },
      {
        title: "Positions",
        path: "/individualDepartment",
        page: "individualDep",
        icon: "",
      },
      {
        title: "Roles",
        path: "/role",
        page: "role",
        icon: "",
      },
      {
        title: "Users",
        path: "/user",
        page: "user",
        icon: "",
      },
    ],
  },
  {
    title: "Change User",
    path: "/landing",
    icon: <i className="fa-solid fa-user"></i>,
  },
];
