"use client";

import Image from "next/image";
import {
  UserGroupIcon,
  LogoutIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSession,signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { drawerState } from "../atom/modalatom";
import { useRouter } from "next/navigation";


export default function Drawer() {
  const {data: session, status} = useSession();
  const [open,setOpen] = useRecoilState(drawerState);
  const router = useRouter();
  function signout(){
    if(window.confirm("Are you sure you want to signout?")){
      signOut()
  }
  }
 

  return (
    <div className={`flex flex-col p-2 xl:items-start fixed h-full xl:ml-24 bg-white w-1/2 justify-between z-50 shadow-sm shadow-slate-500 transition duration-300 sm:hidden visible translate-x-[-50vw] ${open && "translate-x-0"}`}>
      {/* Logo */}
      <div>
        <div className="p-0 mb-8 xl:px-1 cursor-pointer">
            <Image
            width="50"
            height="50"
            src="https://logodix.com/logo/989957.png"
            alt="img"
            onClick={()=>{setOpen(false)}}
            ></Image>
        </div>

        {/* Menu */}

        <div className="flex flex-col  gap-8 mt-4 mb-2.5 xl:items-start">
            <div className="flex items-center text-gray-700 space-x-3">
                <UserIcon className="w-8"/><h3>Profile</h3>
            </div>
            <div className="flex items-center text-gray-700 space-x-3 cursor-pointer" onClick={()=>{router.push("/news")}}>
                <HashtagIcon className="w-8"/><h3>News</h3>
            </div>
            <div className="flex items-center text-gray-700 space-x-3">
                <InboxIcon  className="w-8"/><h3>Messages</h3>
            </div>
            <div className="flex items-center text-gray-700 space-x-3">
                <UserGroupIcon className="w-8"/><h3>Communities</h3>
            </div>
            <div className="flex items-center text-gray-700 space-x-3 cursor-pointer" onClick={signout}>
                <LogoutIcon  className="w-8"/><h3>Sign Out</h3>
            </div>
        </div>
      </div>
      {/* Button */}
        {session ? (
          <>
            {/* Mini-Profile */}

            <div className="gap-2 text-gray-700 flex items-center xl:justify-start mt-auto mb-2">
              <img
                src={session.user.image}
                alt="user-img"
                className="h-10 w-10 rounded-full xl:mr-2"
              />
              <div className="leading-5">
                <h4 className="font-bold">{session.user.name}</h4>
                <p className="text-gray-500">@{session.user.username}</p>
              </div>
              <DotsHorizontalIcon className="h-5 xl:ml-8" />
            </div>
          </>
       ):(
        <button
          onClick={signIn}
          className="bg-purple-400 text-white rounded-full w-36 h-10 font-bold shadow-md hover:brightness-95 text-lg w-full mb-2"
          >
          Sign in
        </button>
       )}  
    </div>
  );
}