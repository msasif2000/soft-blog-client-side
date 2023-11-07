import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogSection from "./BlogSection";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/allBlogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const matchedCategory = category === "All" || blog.category === category;
        const matchedTitle = blog.title.toLowerCase().includes(searchTitle.toLowerCase());

        return matchedCategory && matchedTitle;
    });

    return (
        <div className="md:container mx-auto">
            <Header></Header>
            <div className="md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className="p-2 gap-4 lg:w-4/5 md:w-5/6">
                    <div className="flex justify-between gap-6">
                        <div className="form-control w-full">
                            <label>
                                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="input input-bordered w-full">
                                    <option value="All">All Category</option>
                                    <option value="Travel and Adventure">Travel and Adventure</option>
                                    <option value="Technology and Programming">Technology and Programming</option>
                                    <option value="Food and Cooking">Food and Cooking</option>
                                    <option value="Finance and Money">Finance and Money</option>
                                    <option value="Science and Education">Science and Education</option>
                                    <option value="Games and Sports">Games and Sports</option>
                                    <option value="Fitness and Health">Fitness and Health</option>
                                    <option value="Books and Literature">Books and Literature</option>
                                </select>
                            </label>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search Title"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="input border-2 border-slate-100 w-full"
                                required
                            />
                            <input type="submit" value="Search" className="btn bg-orange-600 text-white absolute top-0 right-0 rounded-l-none" />
                        </div>
                    </div>
                    {filteredBlogs.map(blog => <BlogSection key={blog._id} blog={blog}></BlogSection>)}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllBlogs;
