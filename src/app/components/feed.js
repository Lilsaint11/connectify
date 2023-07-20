"use client";

import { SparklesIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import Input from "./input";
import Post from "./post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Image from "next/image";
import {signIn} from "next-auth/react";
import {AnimatePresence,motion} from "framer-motion";
import { useSession } from "next-auth/react";
import Drawer from "./drawer";
import { useRecoilState } from "recoil";
import { drawerState,postModalState } from "../atom/modalatom";


export default function Feed() {
  const [posts, setPosts] = useState([]);
  const {data:session} = useSession();
  const [open,setOpen] = useRecoilState(drawerState);
  const [postModal,setPostModal] = useRecoilState(postModalState);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  function openDrawer(){
      if(session){
        setOpen(true)
      }
  }

  console.log(open)
 
 
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
     {session && <Drawer /> } 
      <div className="flex py-2 px-3 sticky top-0 z-40 bg-white border-b border-gray-200">
        <div>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer visible max-sm:hidden">Home</h2>
          <Image
            width="50"
            height="50"
            src="https://logodix.com/logo/989957.png"
            alt="img"
            className="visible sm:hidden cursor-pointer"
            onClick={openDrawer}
          ></Image>
        </div>
        <div className={`hoverEffect flex items-center justify-center px-0 ml-auto w-28 h-9 ${!session && "w-28 text-purple-800"}`} >
          {session?<SparklesIcon className="h-5" />:<p onClick={signIn}>Sign in</p>}
        </div>
      </div>
     <span className="visible max-sm:hidden"><Input /></span> 
    <AnimatePresence>
      {posts.map((post)=>(
          <motion.div 
           key={post.id}
           initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          >
            <Post key={post.id} post={post}/>
          </motion.div>
        ))}
    </AnimatePresence>
    {session && <div className="h-5 fixed right-14 bottom-24 h-[45px] w-[45px] rounded-full bg-purple-500 p-2 cursor-pointer flex items-center justify-center visible sm:hidden">
      <PaperAirplaneIcon className="z-50 fixed p-1 rotate-45 text-white" onClick={()=>setPostModal(true)}/>
    </div>}
    </div>
  );
}