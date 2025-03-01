import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./home/home.tsx";
import useStore from "./stores/useStore.ts";

function App() {
    const bears = useStore((state) => state.bears)
    const increase = useStore((state) => state.increase)
  return (
    <>
        {bears}
        <button onClick={()=>increase(11)} >123</button>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
