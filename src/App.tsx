import {BrowserRouter} from 'react-router-dom';
import AppRoutes from "./routes.tsx";

const App: React.FC = () => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);

export default App
