"use client";

import { useRecoilState } from "recoil";
import { postModalState} from "../atom/modalatom";
import { useSession} from "next-auth/react";
import Modal from "react-modal";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {useState,useRef } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function PostModal() {
  const [open, setOpen] = useRecoilState(postModalState);
  const {data: session, status} = useSession();
  const [input, setInput] = useState("");
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setInput("")
    setSelectedFile(null);
    setLoading(false);
    setOpen(false);
};

const addImageToPost = (e) => { 
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }

  reader.onload = (readerEvent) => {
    setSelectedFile(readerEvent.target.result);
  };}
 
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >
          <div className="p-1">

            <div className="flex  p-3 space-x-3">
              <img
                src={session.user.image}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 focus:outline-none text-lg placeholder-gray-700 tracking-wide min-h:[50px] text-gray-700"
                    rows="4"
                    placeholder="Whats popping?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                {selectedFile && (
                  <div className="relative">
                    <XIcon
                      onClick={() => setSelectedFile(null)}
                      className="border h-7 text-black absolute cursor-pointer shadow-md border-white m-1 rounded-full bg-white"
                    />
                    <img
                      src={selectedFile}
                      className={`${loading && "animate-pulse"}`}
                    />
                  </div>
                )}  

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-purple-500 hover:bg-purple-100" />
                       <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      /> 
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-purple-500 hover:bg-purple-100" />
                  </div>
                  <button
                   onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-purple-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}