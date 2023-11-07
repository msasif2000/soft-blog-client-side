import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";


const BlogDetails = () => {
    const blog = useLoaderData();
    const { _id, title, category, authorImg, postAdminMail, image, shortDescription, date, details } = blog;

    const [comments, setComments] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5000/comments/${_id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
            })

    }, [_id])
    return (
        <div className="md:container mx-auto">
            <div className=" flex">
                <Navbar></Navbar>
                <div className="flex md:w-2/3 mx-auto my-8 md:p-0 p-2">
                    <div className='space-y-2'>
                        <img src={image} alt="" className='md:h-[500px] h-[350px]  w-full rounded-lg' />
                        <div className='md:flex  px-2 items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <img src={authorImg} alt="" className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                                <p>Author: <span className='text-blue-600'>{postAdminMail}</span></p>
                            </div>
                            <p className="md:pt-0 pt-2">Date: {date}</p>
                        </div>
                        <div className='px-2 space-y-2'>
                            <p className='text-2xl font-bold'>Title: {title}</p>
                            <p className="font-bold">Category: <span className='italic font-semibold'>{category}</span></p>
                            <p>###{shortDescription}###</p>
                        </div>
                        <div className="border-2 border-orange-600 p-4">
                            <p>{details}</p>
                        </div>
                        <div>
                            {
                                comments?.map(comment => <div className="border-2 border-orange-100 p-4" key={comment._id}>
                                    <div className="flex items-center gap-2">
                                        <img src={comment.commentAuthorImg} alt="" className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                                        <p>{comment.commentAuthorMail}</p>
                                    </div>
                                    <p className="pl-12">{comment.comment}</p>
                                </div>)
                            }
                        </div>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default BlogDetails;