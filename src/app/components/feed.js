"use client";

import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./input";
import Post from "./post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Image from "next/image";
import {signIn} from "next-auth/react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
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
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <div>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer visible max-sm:hidden">Home</h2>
          <Image
            width="50"
            height="50"
            src="https://logodix.com/logo/989957.png"
            alt="img"
            className="visible sm:hidden cursor-pointer"
            onClick={signIn}
          ></Image>
        </div>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post)=>(
          <Post key={post.id} post={post}/>
      ))}
    </div>
  );
}