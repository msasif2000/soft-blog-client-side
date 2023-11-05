import { Outlet } from "react-router-dom";


const App = () => {
    return (
        <div className="md:container mx-auto">
            <Outlet></Outlet>
        </div>
    );
};

export default App;