import React, { createContext, useState } from "react";


export const AuthContext = createContext();

const allowwedUsers = ["admin", "indoidja", "bmriidja", "cnaidja"];
let adressMap = new Map([
  ["admin", "http://192.168.8.135:50008"],
  ["indoidja", "http://192.168.8.135:50005"],
  ["bmriidja", "http://192.168.8.135:50007"],
  ["cnaidja", "http://192.168.8.135:50006"],
]);

adressMap = new Map([
  ["admin", "http://localhost:8080"],
  ["indoidja", "http://localhost:8080"],
  ["bmriidja", "http://localhost:8080"],
  ["cnaidja", "http://localhost:8080"],
]);

// Here you would make a call to your authentication API
// and set the user state accordingly
export const AuthProvider = ({ children }) => {
  const usernameLS = localStorage.getItem("username");
  const [user, setUser] = useState((usernameLS !== "" | usernameLS !== null) ? { username: usernameLS } : null);
  const [host, setHost] = useState("http://localhost:8080");
  const login = (username, password) => {
    if (allowwedUsers.includes(username.toLowerCase())) {
      setUser({ username });
      const hostUrl = "http://localhost:8080";
      if (username.toLowerCase() === "admin") {
        setHost(hostUrl);
      }
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
    <AuthContext.Provider value={{ user, host, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};