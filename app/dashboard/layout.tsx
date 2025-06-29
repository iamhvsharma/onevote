import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      DashboardLayout
      {children}
    </div>
  );
};

export default DashboardLayout;
