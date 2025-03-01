import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import AppLayout from "./AppLayout.tsx";
import AdminNurse from "./pages/admin/nurse/page.tsx";
import Auth from './pages/auth/Auth.tsx'
const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}/>
            <Route path='login' element={<Auth />}/>
            <Route path='register' element={<Auth />}/>
        </Route>
        <Route path="dashboard" element={<AppLayout/>}>
            <Route index element={<Dashboard/>}/>
        </Route>
        <Route path="adminNurse" element={<AdminNurse/>}/>
    </Routes>
);

export default AppRoutes;
