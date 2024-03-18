import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/dashboard" element={<SignIn />} /> */}
    </Routes>
  );
}
