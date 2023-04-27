import { Input, Avatar, Checkbox, Loading } from "@nextui-org/react";
import { useRef, useState } from "react";
// import { UilCameraPlus } from "@iconscout/unicons";
import { UseSignUp } from "./hooks/useSignup";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  UserIcon,
  LockOpenIcon,
  LockClosedIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import svgOne from "../../assets/AuthAssets/One.svg";
import svgTwo from "../../assets/AuthAssets/two.svg";
import shirt from "../../assets/AuthAssets/shirt.svg";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const { signup, isLoading } = UseSignUp();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handelSignup = async () => {
    // check if the userRef is between 3 and 10 characters
    console.log(usernameRef.current.value);
    if (
      usernameRef.current.value.length < 3 ||
      usernameRef.current.value.length > 10
    ) {
      toast.dismiss();
      toast.error("Username must be between 3 and 10 characters");
      return;
    }
    if (
      passwordRef.current.value.length < 3 ||
      passwordRef.current.value.length > 10
    ) {
      toast.dismiss();
      toast.error("Password should be 3 to 10 characters long.");
      return;
    }
    //  if all Ok then signup
    await signup(usernameRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="flex flex-col md:h-screen md:justify-center overflow-hidden md:relative ">
      <section className=" w-screen grid place-content-end">
        <img src={svgOne} className=" w-60 pt-10 md:hidden justify-end " />

        <img
          src={shirt}
          className=" w-70 pt-10  absolute bottom-0 translate-y-16 -translate-x-12 rotate-45 opacity-20 hidden md:block "
        />
      </section>
      <section className=" flex flex-col items-center">
        <p className="text-black font-bold  text-6xl opacity-30 my-6">
          Let’s Start
        </p>
        <div className="py-4">
          <Input
            aria-label="Username"
            clearable
            underlined
            placeholder="Username"
            className="w-80 h-12 "
            contentRight={<UserIcon className="w-32" />}
            ref={usernameRef}
          />
        </div>
        <div>
          <Input.Password
            aria-label="password"
            clearable
            underlined
            placeholder="Password"
            visibleIcon={<LockOpenIcon fill="currentColor " className="w-32" />}
            hiddenIcon={<LockClosedIcon fill="currentColor" className="w-32" />}
            className="w-80 h-12  "
            ref={passwordRef}
          />
        </div>
        {isLoading ? (
          <button className=" bg-btnColor w-80 h-12 rounded text-white font-semibold mt-8">
            <Loading color={"currentColor"} />
          </button>
        ) : (
          <motion.button
            className=" bg-btnColor w-80 h-12 rounded text-white font-semibold mt-8"
            onClick={() => handelSignup()}
            whileTap={{ scale: 0.8 }}
          >
            Create an account
          </motion.button>
        )}
        <p className="text-btnColor flex mt-4 text-sm">
          Already had an account ?
          <Link to="/" className="pl-2 font-semibold flex">
            sign in <LinkIcon className="w-4 pl-1" />
          </Link>
        </p>
        <div className="   absolute bottom-0 mb-5 text-2xl opacity-40 flex flex-col items-center">
          <p className="LogoFont mx-2">closetly</p>
          <p className="text-xs opacity-60   font-bold pt-2">
            Your virtual closet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
