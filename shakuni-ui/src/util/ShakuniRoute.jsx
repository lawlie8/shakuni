import { Route, Routes } from "react-router-dom";
import { DashBoard } from "../pages/internal/DashBoard";
import { Login } from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Config from "../pages/config/Config";
import Management from "../pages/management/Management";

export default function ShakkuniRoute(path = {path}){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/config" element={<Config />}></Route>
            <Route path="/management" element={<Management />}></Route>
            <Route path="/" element={<Login />}></Route>
        </Routes>
    );
}