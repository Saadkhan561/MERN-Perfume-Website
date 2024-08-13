import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProtectedWrapper = (Component) => (props) => {
  const { currentUser,isLoading } = useUserStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(isLoading)
    if (!isLoading) {
      if (!currentUser) {
        router.push("/register?login=true");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [currentUser, router,isLoading, setIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Component {...props} /> : <div>Redirecting...</div>;
};

export const withProtectedWrapper = ProtectedWrapper;