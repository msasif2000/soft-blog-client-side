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
      } 
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)