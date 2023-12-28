import { createContext, useContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo, removeUserInfo } from "../store/auth";

import app_api from "../config/ApiConfig";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { auth } from "../config/Firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function signUp(name, email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                await updateProfile(userCredential.user, {
                    displayName: name
                });
                await app_api.post(`/api/users/`, {
                    title: email,
                    version: "0",
                    content: "Hey there!",
                });
                return userCredential;
            });
    }

    function logOut() {
        return signOut(auth);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);

            if (currentuser) {
                dispatch(setUserInfo(currentuser.providerData[0]))
            } else {
                dispatch(removeUserInfo())
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}