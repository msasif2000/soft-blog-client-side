import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../components/Provider/AuthProvider";

const Register = () => {

    const { createUser, googleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const displayName = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        console.log(photoURL);
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(displayName, photoURL, email, password);
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters!", {
                position: toast.POSITION.TOP_CENTER, autoClose: 1500,
            });
            return;
        }

        const specialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
        const uppercase = /[A-Z]/;
        if (!specialChar.test(password) || !uppercase.test(password)) {
            toast.error("Password must contain at least one special character and one uppercase letter!", {
                position: toast.POSITION.TOP_CENTER, autoClose: 1500,
            });
            return;
        }
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                toast.success("Registration Successful & You're Logged in!", {
                    position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                });


                setTimeout(() => {
                    navigate(location.state?.from ? location.state.from : '/');
                }, 2000);
            })
            .catch(error => {
                console.log(error.message)
                toast.error("Email already registered! Please Login now", {
                    position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                });


                setTimeout(() => {
                    navigate(location.state?.from ? location.state.from : '/login');
                }, 2000);
            })

    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                toast.success("Login with Google Successful!", {
                    position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                });


                setTimeout(() => {
                    navigate(location.state?.from ? location.state.from : '/');
                }, 2000);
            })
            .catch(error => {
                console.log(error.message)
                toast.error("Email or Password error!", {
                    position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                });

                setTimeout(() => {
                    navigate(location.state?.from ? location.state.from : '/login');
                }, 2000);
            })
    }


    return (
        <div>
            <Navbar></Navbar>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Register Your Account!</h1>
                    </div>
                    <div className="card flex-shrink-2 w-full max-w-sm border-2 border-orange-600">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered text-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input type="url" name="photoURL" placeholder="photo url" className="input input-bordered text-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered text-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered text-black" required />

                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text  text-xl">Accept <Link to="/termsCondition" className="underline">Term & Conditions</Link></span>
                                    <input type="checkbox" className="checkbox checkbox-primary" required />
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="text-white py-2 rounded-xl font-bold bg-orange-600">Register</button>
                            </div>



                        </form>
                        <div className="text-center">
                            <p>--or--</p>
                            <p>continue with</p>
                            <div onClick={handleGoogleLogin} className="flex justify-center mx-10 border-2 rounded-lg border-orange-600">
                                <p className="flex gap-2 p-2  bg-white"><FcGoogle className="text-2xl "></FcGoogle> Google</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <label className="label ">
                                <p>Already have an Account? <Link to="/login" className="underline text-orange-600 font-bold">Login</Link></p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Register;