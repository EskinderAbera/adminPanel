import React from "react";

export const SidebarDataUser = [
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
        title: "Perspectives",
        path: "/perspective",
        page: "persp",
        icon: "",
      },
      {
        title: "Objectives",
        path: "/objective",
        page: "obj",
        icon: "",
      },
      {
        title: "Kpis",
        path: "/kpi",
        page: "kpi",
        icon: "",
      },
    ],
  },
];
