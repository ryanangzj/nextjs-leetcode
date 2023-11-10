"use client";
import { auth, firestore } from "@/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc, query, collection } from "firebase/firestore";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const GoogleLogin = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(result.user);
        console.log(credential);
        console.log(token);

        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          likedProblems: [],
          dislikedProblems: [],
          solvedProblems: [],
          starredProblems: [],
        };

        const q = query(collection(firestore, "users", result.user.uid));

        if (q) return;

        setDoc(doc(firestore, "users", result.user.uid), userData);
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="space-y-6 px-6">
      <button
        className="flex items-center justify-center h-10 px-6 mt-8 text-sm sm:mx-auto sm:w-full sm:max-w-sm bg-white border-2 border-gray-100  text-black rounded-lg focus:shadow-outline hover:bg-slate-200 duration-300 transition-colors font-semibold"
        onClick={signInWithGoogle}
      >
        <img
          src="Google.png"
          alt="Google Logo"
          width={20}
          height={20}
          className="mx-2"
        />
        Sign In with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
