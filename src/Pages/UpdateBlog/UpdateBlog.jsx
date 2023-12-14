import { useContext, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../components/Provider/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const UpdateBlog = () => {
    var modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    const blog = useLoaderData();
    const { title, image, category, shortDescription, details, _id } = blog;
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const userImg = user?.photoURL ? user.photoURL : "https://i.ibb.co/R3PnR7z/user.png";
    const [quillContent, setQuillContent] = useState(details);
    const handleProcedureContentChange = (content) => {
        setQuillContent(content);
    };

    const handleUpdateBlog = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const image = form.image.value;
        const shortDescription = form.shortDescription.value;

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });

        const updateBlog = {
            title,
            category,
            image,
            authorImg: userImg,
            shortDescription,
            details: quillContent,
            currentDate,
            date: formattedDate
        };

        try {
            const response = await fetch(`https://soft-blog-server.vercel.app/allBlogs/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateBlog)
            });

            if (response.ok) {
                toast.success("Your Blog is updated!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });

                setTimeout(() => {
                    navigate(location.state?.from ? location.state.from : '/');
                }, 2000);
            } else {
                toast.error("Failed to update the blog. Please try again later.");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

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
                                <div className="form-control pb-12">
                                    <label className="label">
                                        <span className="label-text font-bold">Update Details</span>
                                    </label>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={quillContent}
                                        onChange={handleProcedureContentChange}
                                        style={{ height: "220px" }}
                                    />
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
