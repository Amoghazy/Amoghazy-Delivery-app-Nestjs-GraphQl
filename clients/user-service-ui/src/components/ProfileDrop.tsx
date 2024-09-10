"use client";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import AuthScreen from "../screens/AuthScreen";

export default function ProfileDrop() {
  const [logedIn, setLoggedIn] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <>
      <div className="flex-none">
        {logedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <div>
                  <a className=" ">
                    <p className="font-semibold">Signed in as</p>
                    <p>&nbsp; &nbsp;&nbsp;ahmed@gmail.com</p>
                  </a>
                </div>
              </li>
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>All Orders</a>
              </li>
              <li>
                <a>Apply for seller Acc</a>
              </li>
              <li className="border-t my-1 border-gray-600">
                <a className="hover:text-red-500 hover:bg-red-100 mt-1">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
           
              <FaUserAlt onClick={() => setOpenAuth(!openAuth)} size={20} className=" cursor-pointer" />
           
          </>
        )}
      </div>

      {
        openAuth && <AuthScreen setOpenAuth={setOpenAuth} />
      }
    </>
  );
}
