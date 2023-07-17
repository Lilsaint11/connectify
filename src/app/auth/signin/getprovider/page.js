"use client";

import {signIn} from "next-auth/react"

export default function GetProvider() {
    return (
      <div className="flex justify-center mt-20 space-x-4">
        <img
          src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
          alt="twitter image inside a phone"
          className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
        />
        <div className="">
                <div className="flex flex-col items-center">
                <img
                  className="w-[300px] object-cover"
                  src="https://logodix.com/logo/989957.png"
                  alt="connectify logo"
                />
                <button
                    onClick={()=>signIn("google", {callbackUrl : "/"})}
                  className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
                >
                  Sign in with Google
                </button>
              </div>
        </div>
      </div>
    );
  }