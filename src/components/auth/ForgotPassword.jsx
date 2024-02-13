import React, { useEffect, useRef, useState } from "react";
import Icons from "../Icons";
import Button from "../Button";
import toast from "react-hot-toast";
import { auth } from "../../config/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ setForgotPass }) => {
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState("");
  const emailRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailRef.current && !emailRef.current.contains(event.target)) {
        setIsActive("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailRef, setIsActive]);

  const handleForgotPassword = () => {
    if (!email) {
      return toast.error("Please enter your email");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent");
        setForgotPass(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="h-full w-full px-8 flex flex-col justify-center items-center">
      <div className="w-full px-8 text-2xl font-bold">Forgot Password?</div>
      <div className="w-full flex flex-col justify-center text-xs rounded-lg items-center mt-8 px-8">
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
            value={email}
            className="w-full overflow-hidden focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="px-8 w-full flex gap-2 mt-6">
        <Button
          icon={"cross"}
          onClick={() => {
            setForgotPass(false);
          }}
        >
          Cancel
        </Button>
        <Button
          icon={"email"}
          onClick={() => {
            handleForgotPassword();
          }}
        >
          Send Reset Email
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
