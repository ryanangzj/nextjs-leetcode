"use client";
import { auth } from "@/firebase/firebase";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React from "react";

const FacebookLogin = () => {
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(result.user);
        console.log(credential);
        console.log(token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="px-6">
      <button
        className="flex items-center justify-center h-10 px-6 mt-4 text-sm sm:mx-auto sm:w-full sm:max-w-sm bg-white border-2 border-gray-100  text-black rounded-lg focus:shadow-outline hover:bg-slate-200 duration-300 transition-colors font-semibold"
        onClick={signInWithFacebook}
      >
        <Image
          src="/Facebook.png"
          alt="Facebook Logo"
          width={25}
          height={25}
          className="mx-1"
        />
        Sign In with Facebook
      </button>
    </div>
  );
};

export default FacebookLogin;
