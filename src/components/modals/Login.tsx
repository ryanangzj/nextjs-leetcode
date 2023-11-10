import { authModalState } from "@/atoms/authmodalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import GoogleLogin from "../buttons/GoogleLogin";
import FacebookLogin from "../buttons/FacebookLogin";
import { toast } from "react-toastify";

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({
      ...prev,
      type: type,
    }));
  };
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return alert("Please fill in all fields");
    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!user) return;
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
  }, [error]);

  return (
    <>
      <h3 className="flex justify-center text-xl font-semibold text-white">
        Sign in to Leet Code
      </h3>
      <GoogleLogin />
      <FacebookLogin />
      <form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
        <div className="flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-100 font-semibold text-md">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Your Email
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 place-holder-gray-400 placeholder-gray-300 text-white"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Your password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 place-holder-gray-400 placeholder-gray-300 text-white"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
        <button className="flex w-full justify-end">
          <a
            href="#"
            className="text-sm block text-brand-orange hover:underline w-full text-right"
            onClick={() => handleClick("forgotPassword")}
          >
            Forgot Password
          </a>
        </button>
        <div className="text-sm font-medium text-gray-300 ">
          Not Registered {"   "}
          <a
            href="#"
            className="text-blue-700 hover:underline"
            onClick={() => handleClick("register")}
          >
            Create Account
          </a>
        </div>
      </form>
    </>
  );
};

export default Login;
