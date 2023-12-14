import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AuthProvider from './components/Provider/AuthProvider';
import AddCategory from './Pages/AddCategory/AddCategory';
import ErrorPage from './components/ErrorPage/ErrorPage';
import PrivateRoute from './components/Provider/PrivateRoute';
import CreateBlog from './Pages/CreateBlog/CreateBlog';
import AllBlogs from './Pages/AllBlogs/AllBlogs';
import BlogDetails from './Pages/AllBlogs/BlogDetails';
import WishLists from './Pages/WishLists/WishLists';
import Profile from './Pages/Profile/Profile';
import UpdateBlog from './Pages/UpdateBlog/UpdateBlog';
import FeaturedBlogs from './components/FeaturedBlogs/FeaturedBlogs';
import { SkeletonTheme } from 'react-loading-skeleton';
import UpdateProfile from './Pages/Profile/UpdateProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/addCategory',
        element: <AddCategory></AddCategory>
      },
      {
        path: '/createBlog',
        element: <PrivateRoute><CreateBlog></CreateBlog></PrivateRoute>
      },
      {
        path: '/updateBlog/:id',
        element: <UpdateBlog></UpdateBlog>,
        loader: ({ params }) => fetch(`https://soft-blog-server.vercel.app/allBlogs/${params.id}`)
      },
      {
        path: '/allBlogs',
        element: <AllBlogs></AllBlogs>
      },
      {
        path: '/allBlogs/:id',
        element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://soft-blog-server.vercel.app/allBlogs/${params.id}`)
      },
      {
        path: '/wishLists',
        element: <PrivateRoute><WishLists></WishLists></PrivateRoute>,
        
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/updateProfile',
        element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
      {
        path: '/featuredBlogs',
        element: <FeaturedBlogs></FeaturedBlogs>,
        loader: () => fetch('https://soft-blog-server.vercel.app/featuredBlogs')
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </SkeletonTheme>
  </React.StrictMode>,
)