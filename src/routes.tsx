import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from "./pages/dashboard.tsx";
import Settings from "./pages/Settings.tsx";
import AppLayout from "./AppLayout.tsx";
import AdminNurse from "./pages/admin/nurse/page.tsx";

const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}/>
        </Route>
        <Route path="dashboard" element={<Dashboard/>}>
            <Route index element={<Home/>}/>
            <Route path="settings" element={<Settings/>}/>
        </Route>
        <Route path="adminNurse" element={<AdminNurse/>}/>
    </Routes>
);

export default AppRoutes;
