import { withProtectedWrapper } from "@/components/Protected Route/protectedRoute";
import AdminHeader from "@/components/adminPanel/header";
import Sidebar from "@/components/adminPanel/sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen font-sans">
      <ToastContainer position="top-center" />
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
};

export default withProtectedWrapper(AdminLayout);
