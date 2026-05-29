import {
  createContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import API from "../api/axios";

import type { User } from "../types/user";


interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
}


export const AuthContext =
  createContext<AuthContextType | null>(null);


interface Props {
  children: ReactNode;
}


export const AuthProvider = ({
  children
}: Props) => {

  const [user, setUser] =
    useState<User | null>(null);


  const fetchUser = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {

      const res = await API.get(
        "/auth/me",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setUser(res.data.user);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};