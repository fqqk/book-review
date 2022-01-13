import * as React from "react";
import "./style/App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//コンポーネントのimport
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Review } from "./components/Review";
import { Profile } from "./components/Profile";

//関数コンポーネントはJSXを返す関数

export const App = () => {
  function RequireAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      return <Review />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  function RequireAuthSignUp() {
    const token = localStorage.getItem("token");
    if (token) {
      return <Navigate to="/" />;
    } else {
      return <SignUp />;
    }
  }

  function RequireAuthLogin() {
    const token = localStorage.getItem("token");
    if (token) {
      return <Navigate to="/" />;
    } else {
      return <Login />;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<RequireAuthSignUp></RequireAuthSignUp>}
        />
        <Route path="/login" element={<RequireAuthLogin></RequireAuthLogin>} />
        <Route path="/" element={<RequireAuth></RequireAuth>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
