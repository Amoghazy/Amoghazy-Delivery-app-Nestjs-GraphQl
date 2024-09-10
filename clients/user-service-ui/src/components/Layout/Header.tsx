import React from "react";
import ProfileDrop from "../ProfileDrop";
import Link from "next/link";
import NavItems from "../NavItems";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full  bg-[#092240]">
      <div className="navbar justify-between w-[90%] mx-auto">
        <Link
          href={"/"}
          className=" btn btn-ghost hover:bg-transparent  text-2xl"
        >
          FIMT{" "}
          <Image
            src={"/stellar-coin_825462.png"}
            alt="logo"
            width={25}
            height={25}
            className="inline-block -ml-2"
          />
        </Link>
        <NavItems />
        <ProfileDrop />
       
      </div>
    </header>
  );
}
