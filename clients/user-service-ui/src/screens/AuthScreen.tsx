import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function AuthScreen() {
 const[activeSate,setActiveState] =useState("login");
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 h-screen z-50 flex items-center justify-center bg-black/60">
        {/* <div className="w-[30%] bg-[#213853] rounded h-[500px]"> */}
        {/* </div> */}
        {
          activeSate==="login"?<Login setActiveState={setActiveState} />: activeSate==="signUp"?<SignUp setActiveState={setActiveState} />:null
        }
      </div>
    </>
  );
}
