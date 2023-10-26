import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Sidebar.css";
import * as Bootstrap from "bootstrap";
import questlogLogo from "../../assets/questlog-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectGroup } from "@fortawesome/free-regular-svg-icons";

interface NavLinkRenderProps {
  isActive: boolean;
}

const Sidebar: React.FC = () => {
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipInstances = tooltipTriggerList.map((tooltipTriggerEl) => {
      return new Bootstrap.Tooltip(tooltipTriggerEl);
    });

    return () => {
      tooltipInstances.forEach((instance) => {
        instance.dispose();
      });
    };
  }, []);

  const handleActiveNavLink = ({ isActive }: NavLinkRenderProps): string => {
    return isActive ? "nav-link active" : "nav-link text-white";
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100"
      style={{ width: "280px" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <img
          src={questlogLogo}
          className="me-2"
          alt=""
          style={{ width: "40px" }}
        />
        <span className="fs-4">QuestLog</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/tasks" className={handleActiveNavLink}>
            <svg className="bi me-2" width="16" height="16">
              <FontAwesomeIcon icon={faListCheck} />
            </svg>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={handleActiveNavLink}>
            <svg className="bi me-2" width="16" height="16">
              <FontAwesomeIcon icon={faObjectGroup}  />
            </svg>
            Projects
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://avatars.githubusercontent.com/u/7483565?v=4"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link className="dropdown-item" to="/project/new">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/user">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/logout">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
