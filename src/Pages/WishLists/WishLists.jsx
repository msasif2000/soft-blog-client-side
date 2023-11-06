
import { useLoaderData } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import WishListPage from "./WishListPage";


const WishLists = () => {
    const wishLists = useLoaderData();
    //console.log(wishLists);

     
    return (
        <div className="md:container mx-auto">
            <div className=" md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className=" p-2 gap-4  lg:w-4/5 md:w-5/6">
                    {
                        wishLists.map(blog => <WishListPage key={blog._id} blog={blog}></WishListPage>)
                    }
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default WishLists;