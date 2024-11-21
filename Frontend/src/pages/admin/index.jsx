import React from "react";
import AdminLayout from "./layout";
import Meta from "@/components/metaTags/meta";

const Dashboard = () => {
  return (
    <AdminLayout>
      <Meta
        title="Admin Dashboard - Perfume Shop"
        description="Manage the Perfume Shop website content, including products, orders, and categories."
      />
      <div>Dashboard</div>
    </AdminLayout>
  );
};

export default Dashboard;
