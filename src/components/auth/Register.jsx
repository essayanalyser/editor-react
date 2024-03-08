import React, { useEffect, useRef, useState } from "react";
import Icons from "../Icons";
import Button from "../Button";
import { auth } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import app_api from "../../config/ApiConfig";

const Register = ({ setAuthType, setUser, setLoading }) => {
  const [isActive, setIsActive] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleRegister = () => {
    setLoading(true);
    if (!name || !email || !password || !rePassword) {
      setLoading(false);
      return toast.error("Please fill all the fields");
    }
    if (password !== rePassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user
          .getIdToken()
          .then((token) => {
            localStorage.setItem("token", token);
          })
          .then(async () => {
            await app_api
              .post(`/api/users/`, {
                title: email,
                version: "0",
                content: "Hey there!",
              })
              .then(() => {
                setUser(email);
                localStorage.setItem("user", email);
                toast.success("Registered successfully");
                navigate("/main");
              })
              .catch((e) => {
                toast.error("Something went wrong");
              });
          });
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emailRef.current &&
        !emailRef.current.contains(event.target) &&
        passwordRef.current &&
        !passwordRef.current.contains(event.target) &&
        nameRef.current &&
        !nameRef.current.contains(event.target) &&
        rePasswordRef.current &&
        !rePasswordRef.current.contains(event.target)
      ) {
        setIsActive("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailRef, passwordRef, nameRef, rePasswordRef, setIsActive]);

   const signInWithGoogle = () => {
     const provider = new GoogleAuthProvider();
     signInWithPopup(auth, provider).then(async (result) => {
       const user = result?.user;
       const creationTime = result?.user?.metadata?.creationTime;
       const currentTime = new Date().toISOString();
       const timeDifference = Math.abs(
         new Date(currentTime) - new Date(creationTime)
       );
       const secondsDifference = Math.floor(timeDifference / 1000);
       if (secondsDifference <= 5) {
         await app_api
           .post(`/api/users/`, {
             title: user.email,
             version: "0",
             content: "Hey there!",
           })
           .then(() => {
             setUser(user.email);
             localStorage.setItem("user", user.email);
             localStorage.setItem("token", user.accessToken);
             toast.success("Registered successfully");
             navigate("/main");
           })
           .catch((e) => {
             toast.error("Something went wrong");
           });
       } else {
         setUser(user.email);
         localStorage.setItem("user", user.email);
         localStorage.setItem("token", user.accessToken);
         toast.success("Logged in successfully");
         navigate("/main");
       }
     });
   };
  return (
    <div className="h-full w-full flex px-8 flex-col justify-center items-center">
      <div className="w-full px-8 text-2xl font-bold">Sign Up</div>
      <div className="w-full mt-5 text-gray-400 px-8 text-sm">
        If you already have an account
      </div>
      <div className="w-full mt-1 text-sm px-8 font-semibold text-[#0C21C1]">
        <div
          className="cursor-pointer hover:underline w-fit"
          onClick={() => {
            setAuthType("login");
          }}
        >
          Log in here
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-8 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Name</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "name" ? "border-[#0C21C1]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("name");
          }}
          ref={nameRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="name"
              width="20"
              height="20"
              color={isActive === "name" ? "#0C21C1" : "#676767"}
            />
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Email</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "email" ? "border-[#0C21C1]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("email");
          }}
          ref={emailRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="email"
              width="20"
              height="20"
              color={isActive === "email" ? "#0C21C1" : "#676767"}
            />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Password</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "password" ? "border-[#0C21C1]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("password");
          }}
          ref={passwordRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="password"
              width="20"
              height="20"
              color={isActive === "password" ? "#0C21C1" : "#676767"}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-5 px-8">
        <div className="text-xs text-gray-400 w-full px-4">Re-Password</div>
        <div
          className={`w-full h-full transition-all duration-200 border-b-2 flex gap-2 py-2 rounded-lg ${
            isActive === "repassword" ? "border-[#0C21C1]" : "border-gray-100"
          }`}
          onClick={() => {
            setIsActive("repassword");
          }}
          ref={rePasswordRef}
        >
          <div className="w-16 h-full flex justify-center items-center">
            <Icons
              name="password"
              width="20"
              height="20"
              color={isActive === "repassword" ? "#0C21C1" : "#676767"}
            />
          </div>
          <input
            type="password"
            placeholder="Re-enter your password"
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
      </div>
      <div className="px-8 w-full mt-6">
        <Button icon={"login"} onClick={() => handleRegister()}>
          Register
        </Button>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />
        <span className="absolute px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2">
          or
        </span>
      </div>
      <div className="px-8 w-full flex flex-col gap-2">
        <Button
          onClick={() => {
            signInWithGoogle();
          }}
          icon={"google"}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Register;
