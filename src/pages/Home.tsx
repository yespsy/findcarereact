import {Link} from "react-router-dom";
import useStore from "../stores/useStore.ts";

export default function Home() {
    const bears = useStore((state) => state.bears)
    const increase = useStore((state) => state.increase)
    return (
        <div>
            <h1>Home Page</h1>
            {bears}
            <button onClick={() => increase(11)}>123</button>
            <Link to="/header">Header</Link>
        </div>
    )
}
