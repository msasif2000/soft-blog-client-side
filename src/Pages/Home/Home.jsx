import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MiddleSide from "../../components/MiddleSide/MiddleSide";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "../../components/RighSide/RightSide";


const Home = () => {
    return (
        <div>
            <Header></Header>
            <div className="flex gap-6">
                <div className="w-1/5">
                    <Navbar></Navbar>
                </div>
                <div className="w-3/5">
                    <MiddleSide></MiddleSide>
                </div>
                <div className="w-1/5">
                    <RightSide></RightSide>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;