import React from "react";
import { Navigate } from "react-router-dom";
import { Review } from "../components/Review";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";

//認証の状態によってアクセス制御する関数
export const RequireAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Review />;
  } else {
    return <Navigate to="/login" />;
  }
};

export const RequireAuthSignUp = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  } else {
    return <SignUp />;
  }
};

export const RequireAuthLogin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  } else {
    return <Login />;
  }
};
