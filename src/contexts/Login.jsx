import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [userImg, setUserImg] = useState("");

  return (
    <LoginContext.Provider value={{ user, setUser, userImg, setUserImg }}>
      {children}
    </LoginContext.Provider>
  );
};
