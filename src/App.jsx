import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";


const App = () => {
    return (
        <div>
            <div className="md:container mx-auto">
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
            <aside className='text-center bg-black text-white p-1'>
                <p>Copyright © 2023 - All right reserved by Soft Blog Developer Team</p>
            </aside>
        </div>
    );
};

export default App;