"use client";

import { SparklesIcon } from "@heroicons/react/outline";
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
import { drawerState } from "../atom/modalatom";


export default function Feed() {
  const [posts, setPosts] = useState([]);
  const {data:session} = useSession();
  const [open,setOpen] = useRecoilState(drawerState);
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
        setOpen(!open)
      }
  }
 
 
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
        <div className={`hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9 ${!session && "w-20 text-purple-800"}`} >
          {session?<SparklesIcon className="h-5" />:<p onClick={signIn}>Sign in</p>}
        </div>
      </div>
      <Input />
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
    </div>
  );
}