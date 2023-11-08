
import WishListPage from "./WishListPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Provider/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";


const WishLists = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const [wishLists, setWishLists] = useState([]);
    //console.log(wishLists);
    useEffect(() => {
        fetch(`http://localhost:5000/wishLists/${userEmail}`, {credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                setWishLists(data);
            })
    }, [userEmail])

    return (
        <div className="md:container mx-auto">
            <Header></Header>
            <div className=" md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className=" p-2 gap-4  lg:w-4/6 mx-auto md:w-5/6">
                    {
                        wishLists.map(blog => <WishListPage key={blog._id} blog={blog}></WishListPage>)
                    }
                </div>

            </div>
        </div>
    );
};

export default WishLists;