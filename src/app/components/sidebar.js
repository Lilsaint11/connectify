"use client";

import Image from "next/image";
import SidebarMenuItem from "./sidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  LogoutIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSession,signIn, signOut } from "next-auth/react";


export default function Sidebar() {
  const {data: session, status} = useSession();
  function signout(){
    if(window.confirm("Are you sure you want to signout?")){
      signOut()
  }
  }
 

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24 bg-white">
      {/* Twitter Logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          width="50"
          height="50"
          src="https://logodix.com/logo/989957.png"
          alt="img"
        ></Image>
      </div>

      {/* Menu */}

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
          {session && (
            <>
              <SidebarMenuItem text="Notifications" Icon={BellIcon} />
              <SidebarMenuItem text="Messages" Icon={InboxIcon} />
              <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
              <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
              <SidebarMenuItem text="Profile" Icon={UserIcon} />
              <span onClick={signout}><SidebarMenuItem text="Logout" Icon={LogoutIcon} /></span>
            </>
          )}
      </div>

      {/* Button */}
        {session ? (
          <>
            <button className="bg-purple-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
              Post
            </button>

            {/* Mini-Profile */}

            <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
              <img
                src={session.user.image}
                alt="user-img"
                className="h-10 w-10 rounded-full xl:mr-2"
              />
              <div className="leading-5 hidden xl:inline">
                <h4 className="font-bold">{session.user.name}</h4>
                <p className="text-gray-500">@{session.user.username}</p>
              </div>
              <DotsHorizontalIcon className="h-5 xl:ml-8 hidden lg:inline" />
            </div>
          </>
       ):(
        <button
          onClick={signIn}
          className="bg-purple-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
          >
          Sign in
        </button>
       )}  
    </div>
  );
}