import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

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
                <div className="w-3/5 flex flex-col items-center justify-center">
                    <Banner></Banner>
                </div>
                <div className="w-1/5 mr-2">
                    <RightSide></RightSide>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;