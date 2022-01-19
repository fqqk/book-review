import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "../components/Profile";
import { AddReview } from "../components/addReview";
import { Detail } from "../components/pages/Detail";
import { Edit } from "../components/Edit";
import { RequireAuth } from "../functions/requireAuths";
import { RequireAuthSignUp } from "../functions/requireAuths";
import { RequireAuthLogin } from "../functions/requireAuths";

export const Router = () => {
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
