import {Outlet} from "react-router-dom";
import Header from "./pages/common/Header.tsx";
import Footer from "./pages/common/Footer.tsx";

export default function AppLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
