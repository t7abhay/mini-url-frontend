import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/axios/axiosInstance";

interface User {
  username: string;
  email: string;
  roleId: number;
  roleName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/me/profile", {
          withCredentials: true,
        });

        setUser({
          username: res.data?.data?.username,
          email: res?.data?.data?.email,
          roleId: res?.data?.data?.roleId,
          roleName: res?.data?.data?.roleName,
        });
      } catch (error) {
        console.log("Not authenticated");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
