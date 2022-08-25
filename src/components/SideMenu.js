import React, { useEffect, useState } from "react";
import logo from "../assets/logo/logo192.png";

import user from "../assets/user.jpg";

import MenuItem from "./MenuItem";

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/dashboard",
    iconClassName: "bi bi-book",
  },
  {
    name: "Student",
    exact: true,
    to: `/student`,
    iconClassName: "bi bi-calendar-month",
    subMenus: [
      { name: "Add", to: "/student/addStudent" },
      // { name: "Edit", to: "/student/editStudent" },
      // { name: "Report Card", to: "/content/videos" },
    ],
  },
  {
    name: "Teacher",
    to: `/teacher`,
    iconClassName: "bi bi-vector-pen",
    subMenus: [{ name: "Add", to: "/addTeacher" }],
  },
  {
    name: "Configuration",
    to: `/classList`,
    iconClassName: "bi bi-vector-pen",
    subMenus: [
      { name: "Class", to: "/classList" },
      { name: "Subject", to: "/subjectList" },
    ],
  },
  { name: "Report", to: `/design-4`, iconClassName: "bi bi-vector-pen" },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>
      <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>
        <input type="text" placeholder="search" />
      </div>
      <div className="divider"></div>
      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>Bharti Kuchekar</h5>
          <p>Kuchekar27@gmail.com</p>
        </div>
        <ul>
          <li>
            <a
              href="/"
              style={{ color: "white" }}
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
