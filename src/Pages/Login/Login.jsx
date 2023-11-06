import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../components/Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";



const Login = () => {
    const { googleLogin, userLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        userLogin(email, password)
            .then(result => {
                //console.log(result.user)
                if(result){
                    toast.success("Login Successful!", {
                        position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                    });
                }


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
            <div className="md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>

                <div className="hero min-h-screen  lg:w-4/5 md:w-5/6">
                    <div className="hero-content flex-col w-full">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                        </div>
                        <div className="card flex-shrink-2 w-full max-w-sm border-2 border-orange-600">
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="text-white py-2 rounded-xl font-bold bg-orange-600">Login</button>
                                </div>

                            </form>
                            <div className="text-center">
                                <p>--or--</p>
                                <p>continue with</p>

                            </div>
                            <div onClick={handleGoogleLogin} className="flex justify-center mx-auto border-2 rounded-lg border-orange-600 my-1">
                                <p className="flex gap-2 p-2  bg-white"><FcGoogle className="text-2xl "></FcGoogle> Google</p>
                            </div>
                            <div className="flex justify-center">
                                <label className="label">
                                    <p>Don`t have an Account? <Link to="/register" className="underline text-orange-600 font-bold">Register</Link></p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;