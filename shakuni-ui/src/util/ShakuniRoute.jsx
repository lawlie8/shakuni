import { Route, Routes } from "react-router-dom";
import { DashBoard } from "../pages/internal/DashBoard";
import { Login } from "../pages/login/Login";

export default function ShakkuniRoute(path = {path}){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/" element={<Login />}></Route>
        </Routes>
    );
}