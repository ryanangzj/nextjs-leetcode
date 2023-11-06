"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";

import { useRecoilValue } from "recoil";
import { authModalState } from "../../atoms/authmodalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/modals/AuthModal";
import Image from "next/image";

const Auth = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    if (!loading && !user) {
      setPageLoading(false);
    }
  }, [user, router, loading]);

  if (pageLoading) return null;

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <Image src="/hero.png" alt="hero image" height={700} width={700} />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};

export default Auth;
