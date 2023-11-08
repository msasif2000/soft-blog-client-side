import { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../components/Provider/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";

const UpdateBlog = () => {

    const blog = useLoaderData();
    //console.log(blog);

    const { title, image, category, shortDescription, details, _id } = blog;
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    //console.log(user);
    const currentEmail = user.email;
    const userImg = user?.photoURL ? user.photoURL : "https://i.ibb.co/R3PnR7z/user.png";

    const handleUpdateBlog = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const image = form.image.value;
        const shortDescription = form.shortDescription.value;
        const details = form.details.value;

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        const updateBlog = { title, category, image, authorImg: userImg, shortDescription, details, currentDate:currentDate, date: formattedDate };
        //console.log(newBlog);

        fetch(`http://localhost:5000/allBlogs/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateBlog)
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data) {
                    toast.success("Your Blog is updated!", {
                        position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                    });
                }


                setTimeout(() => {
                    navigate(location.state?.from ? location.state.from : `/profile/${currentEmail}`);
                }, 2000);
            })

    }
    return (
        <div className="md:flex">
            <div className="lg:w-1/5 md:w-2/6">
                <Navbar></Navbar>
            </div>
            <div className="lg:w-4/5 md:w-5/6">
                <div className="md-container lg:mx-24 md:mx-6 mx-2">
                    <div className="lg:p-12 md:p-6 p-4 space-y-6">
                        <h2 className="font-rancho text-4xl text-center">Update your Blog here</h2>
                        <form onSubmit={handleUpdateBlog} className="font-raleway ">
                            <div className=" justify-center">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Title</span>
                                    </label>
                                    <label className="">
                                        <input required type="text" name="title" defaultValue={title} placeholder="Enter Blog Title" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Select Category</span>
                                    </label>
                                    <label className="">
                                        <select name="category" className="input input-bordered w-full">
                                            <option value="Travel and Adventure" selected={category === "Travel and Adventure"}>Travel and Adventure</option>
                                            <option value="Technology and Programming" selected={category === "Technology and Programming"}>Technology and Programming</option>
                                            <option value="Food and Cooking" selected={category === "Food and Cooking"}>Food and Cooking</option>
                                            <option value="Finance and Money" selected={category === "Finance and Money"}>Finance and Money</option>
                                            <option value="Science and Education" selected={category === "Science and Education"}>Science and Education</option>
                                            <option value="Games and Sports" selected={category === "Games and Sports"}>Games and Sports</option>
                                            <option value="Fitness and Health" selected={category === "Fitness and Health"}>Fitness and Health</option>
                                            <option value="Books and Literature" selected={category === "Books and Literature"}>Books and Literature</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Image Link</span>
                                    </label>
                                    <label className="">
                                        <input required type="text" name="image" defaultValue={image} placeholder="Enter Image Link" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Short Description</span>
                                    </label>
                                    <label className="">
                                        <input required type="text" name="shortDescription" defaultValue={shortDescription} placeholder="Enter a Short Description" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Update Details</span>
                                    </label>
                                    <label className="">
                                        <input required type="text" name="details" defaultValue={details} placeholder="Write Your Blog Here..." className="input input-bordered w-full h-28" />
                                    </label>
                                </div>
                            </div>
                            <input type="submit" value="Update" className="w-full mt-6 bg-orange-600 text-white border-black border-2 text-center p-2 font-rancho text-2xl" />
                        </form>
                        <ToastContainer></ToastContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;