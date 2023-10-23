import React, { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        {/* Flex container */}
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1 p-3">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
