import { createContext, useEffect, useState } from "react";
import  PropTypes  from 'prop-types'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../firebase/firebase_config";
//import axios from "axios";

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const userLogout = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            }
            else {
                setUser(null);
            }
        })
        return () => unsubscribed;
        // const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
        //     const userEmail = currentUser?.email || user?.email;
        //     const loggedUser = { email: userEmail };
        //     setUser(currentUser);
        //     setLoading(false);
        //     if (currentUser) {
        //         axios.post('https://soft-blog-server.vercel.app/jwt', loggedUser, {withCredentials: true})
        //         .then(res => {
        //             console.log('token response', res.data);
        //         })
        //     }
        //     else {
        //         axios.post('https://soft-blog-server.vercel.app/logout', loggedUser, {withCredentials: true})
        //        .then(res => {
        //         console.log(res.data);
        //        })
        //     }
        // })
        // return () => unsubscribed;
    }, [])

    const authentications = { user, googleLogin, createUser, userLogin, userLogout, loading }
    return (
        <AuthContext.Provider value={authentications}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default AuthProvider;