import { Route, Routes } from "react-router-dom";
import { DashBoard } from "../pages/internal/DashBoard";
import { Login } from "../pages/login/Login";
import Profile from "../pages/internal/profile/Profile";
import Config from "../pages/internal/config/Config";
import Management from "../pages/internal/management/Management";
import Jobs from "../pages/internal/jobs/Jobs";
import About from "../pages/internal/about/About";

export default function ShakkuniRoute(path = {path}){
    return(
        <Routes>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/jobs" element={<Jobs />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/config" element={<Config />}></Route>
            <Route path="/management" element={<Management />}></Route>
            <Route path="/" element={<Login />}></Route>
        </Routes>
    );
}