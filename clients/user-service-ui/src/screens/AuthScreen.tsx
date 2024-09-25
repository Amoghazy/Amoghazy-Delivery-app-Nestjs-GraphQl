import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Verification from "../components/Verification";
import { TbXboxX } from "react-icons/tb";
import ForgetPassword from "../components/ForgetPassword";

export default function AuthScreen({
  setOpenAuth,
}: {
  setOpenAuth: (val: boolean) => void;
}) {
  const [activeSate, setActiveState] = useState("login");

  const handelClose = (e: any) => {
    if (e.target.id === "auth") setOpenAuth(false);
  };

  return (
    <>
      <div
        onClick={handelClose}
        id="auth" 
        className="fixed top-0 left-0 right-0 bottom-0 h-screen z-50 flex items-center justify-center bg-black/60"
      >
        <div className="relative">
          <TbXboxX
            onClick={() => setOpenAuth(false)}
            size={20}
            className="block ml-auto absolute right-4 top-4 cursor-pointer hover:text-red-500"
          />
          {activeSate === "login" ? (
            <Login setOpenAuth={setOpenAuth} setActiveState={setActiveState} />
          ) : activeSate === "signUp" ? (
            <SignUp setActiveState={setActiveState} />
          ) : activeSate === "activation" ? (
            <Verification setActiveState={setActiveState} />
          ) : activeSate === "forget-password" ? (
            <ForgetPassword setOpenAuth={setOpenAuth}  setActiveState={setActiveState} />
          ) : null}
        </div>
      </div>
    </>
  );
}
