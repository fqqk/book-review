import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//コンポーネントのimport
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Review } from "./components/Review";
import { Profile } from "./components/Profile";
import { AddReview } from "./components/addReview";
import { Detail } from "./components/Detail";
import { Edit } from "./components/Edit";

//関数コンポーネントはJSXを返す関数

export const App = () => {
  //認証の状態によってアクセス制御
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
        <Route path="/new" element={<AddReview />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};
