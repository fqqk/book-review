import * as React from "react";
import { useState } from "react";
import "./style/App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//コンポーネントのimport
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Review } from "./components/Review";

//関数コンポーネントはJSXを返す関数

export const App = () => {
  const [auth, setAuth] = useState(false);

  function RequireAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      Authorization(token);
      return <Review />;
    } else {
      Authorization(token);
      return <Navigate to="/login" />;
    }
  }

  function AuthJudge() {
    const token = localStorage.getItem("token");
    if (token) {
      Authorization(token);
      return <Navigate to="/" />;
    } else {
      Authorization(token);
      return <SignUp />;
    }
  }

  const Authorization = (token) => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<AuthJudge></AuthJudge>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
};
