"use client";

import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
  } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useSession,signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState} from "../atom/modalatom";
import { useRouter } from "next/navigation";


export default function Post({ post, id }) {
  const {data:session} = useSession();
  const router = useRouter()
  const [comments, setComments] = useState([]);
  const [likes,setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);


  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session?.user.username,
        });
      }
    } else {
      signIn();
      //router.push("/auth/signin");
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", post.id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${post.id}/image`));
      }
      ;
    }
  }

  return (
    <>
        <div className="flex p-3 cursor-pointer border-b border-gray-200 ">
        {/* user image */}
        <img
          className="h-11 w-11 max-sm:h-8 max-sm:w-8 rounded-full mr-4 max-sm:mt-2"
          src={post.data().userImg}
          alt="user-img"
        />
        {/* right side */}
        <div className="flex-1">
          {/* Header */}
  
          <div className="flex items-center justify-between">
            {/* post user info */}
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post.data().name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post.data().username} .{""}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                  <Moment fromNow ago>{post?.data().timestamp?.toDate()}</Moment>
              </span>
            </div>
  
            {/* dot icon */}
            <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
          </div>
  
          {/* post text */}
  
          <p
            className="text-gray-800 text-[15px sm:text-[16px] mb-2"
            onClick={()=>{router.push(`/posts/${post.id}`);}}
          >
            {post.data().text}
          </p>
  
          {/* post image */}
          {post.data().image &&
          <img
            className="rounded-2xl mr-2 max-sm:w-80 max-[400px]:w-72"
            src={post.data().image}
            alt="img"
          />
          }
  
          {/* icons */}
  
          <div className="flex justify-between text-gray-500 p-2 max-sm:w-80">
            <div className="flex items-center select-none">
              <ChatIcon
                onClick={()=>{
                  if(!session){
                    signIn()
                  }else{
                  setPostId(post.id)
                  setOpen(!open)}
                }
                } 
                className="h-9 w-9 hoverEffect p-2 hover:text-purple-500 hover:bg-purple-100"
              />
               {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
            </div>
            
            {session?.user.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          
          <div className="flex items-center">
            {hasLiked ? (
                <HeartIconFilled
                  onClick={likePost}
                  className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                />
              ) : (
                <HeartIcon
                  onClick={likePost}
                  className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                />
              )}
              {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
              >
                {" "}
                {likes.length}
              </span>
            )}
            </div>
  
            <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-purple-500 hover:bg-purple-100" />
            <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-purple-500 hover:bg-purple-100" />
          </div>
        </div>
      </div>
  </>
  );
}