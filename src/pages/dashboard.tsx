import { Outlet } from "react-router";
import Header from "./common/Header.tsx";

export default function Dashboard() {
    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            {/* will either be <Home/> or <Settings/> */}
            <Outlet />
        </div>
    );
}
