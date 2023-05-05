import React, { createContext, useState } from "react";


export const AuthContext = createContext();

let adressMap = new Map([
  ["admin", "http://10.239.19.74:50008"],
  ["indoidja", "http://10.239.19.74:50005"],
  ["bmriidja", "http://10.239.19.74:50007"],
  ["cenaidja", "http://10.239.19.74:50006"],
  ["bninidja", "http://10.239.19.74:50010"],
]);

adressMap = new Map([
 ["admin", "http://localhost:8080"],
 ["indoidja", "http://localhost:8080"],
 ["bmriidja", "http://localhost:8080"],
 ["cenaidja", "http://localhost:8080"],
 ["bninidja", "http://localhost:8080"]
]);

// Here you would make a call to your authentication API
// and set the user state accordingly
export const AuthProvider = ({ children }) => {
  const usernameLS = localStorage.getItem("username");
  const [user, setUser] = useState((usernameLS !== "" | usernameLS !== null) ? { username: usernameLS } : null);
  let allowwedUsers = ["bmriidja", "cenaidja", "bninidja"];
  const login = (username, password) => {
    if (allowwedUsers.includes(username.toLowerCase()) || username.toLowerCase() === "admin" || username.toLowerCase() === "indoidja") {
      setUser({ username });
      if (username.toLowerCase() === "admin" || username.toLowerCase() === "indoidja") {
        username = "admin"
      }
      setUser({username});
      localStorage.setItem("username", username);
      localStorage.setItem("host", adressMap.get(localStorage.getItem("username")));
    } else {
      throw new Error("Pengguna tidak ditemukan")
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, allowwedUsers, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};