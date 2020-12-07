import { useState, createContext, useContext, useEffect, useMemo } from "react";
import { currentUserFn } from "../services/auth";

export const AppContext = createContext();

export const AppCtxProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getSessionData() {
      const { data: currentUser } = await currentUserFn();
      if (currentUser) setUser(currentUser);
    }
    getSessionData();
  }, []);

  const login = (userInfo) => setUser(userInfo);

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AppContext.Provider value={value} {...props} />;
};

export const useContextInfo = () => useContext(AppContext);
