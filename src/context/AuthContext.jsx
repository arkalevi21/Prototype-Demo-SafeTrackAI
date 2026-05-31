import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const users = {
  admin: { name: "Admin User", email: "admin@safetrack.ai", role: "admin", initial: "A" },
  pengawas: { name: "Pengawas K3", email: "pengawas@safetrack.ai", role: "pengawas", initial: "P" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser(users[role] || users.admin);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
