import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import AppLayout from "./AppLayout.tsx";
import AdminNurse from "./pages/admin/nurse/NurseAdmin.tsx";
import Auth from './pages/auth/Auth.tsx'
import Register from "./pages/auth/Register.tsx";
const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}/>
            <Route path='login' element={<Auth />}/>
            <Route path='register' element={<Register />}/>
        </Route>
        <Route path="dashboard" element={<AppLayout/>}>
            <Route index element={<Dashboard/>}/>
        </Route>
        <Route path="adminNurse" element={<AdminNurse/>}/>
    </Routes>
);

export default AppRoutes;
