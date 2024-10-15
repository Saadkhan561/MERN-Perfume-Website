import { withProtectedWrapper } from "@/components/Protected Route/protectedRoute";
import AdminHeader from "@/components/adminPanel/header";
import Sidebar from "@/components/adminPanel/sidebar";
import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen font-sans">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        progress={undefined}
        theme={"dark"}
        transition={Bounce}
      />
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
};

export default withProtectedWrapper(AdminLayout);
