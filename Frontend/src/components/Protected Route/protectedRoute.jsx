import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProtectedWrapper = (Component) => (props) => {
  const { currentUser, isLoading } = useUserStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; 

    // Handle unauthenticated users
    if (!currentUser) {
      if (router.pathname === "/admin") {
        router.push("/adminLogin");
      } else {
        router.push("/register?login=true");
      }
      return;
    }

    // Handle user role checks
    const { role } = currentUser.user;

    if (router.pathname.startsWith("/admin")) {
      if (role !== "admin") {
        router.push("/adminLogin");
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [currentUser, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Component {...props} /> : <div>Redirecting...</div>;
};

export const withProtectedWrapper = ProtectedWrapper;
