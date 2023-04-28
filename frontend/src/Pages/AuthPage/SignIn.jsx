import { Input, Avatar, Checkbox, Loading } from "@nextui-org/react";
import { useState } from "react";
import { UseSignIn } from "./hooks/useSignin";
// import { UilCameraPlus } from "@iconscout/unicons";
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
import { LoaderIcon, toast } from "react-hot-toast";
const SignIn = () => {
  // const { signin, isLoading } = UseSignIn();
  const { signin, isLoading } = UseSignIn();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handelSignin = () => {
    // check if the userRef is between 3 and 10 characters
    console.log(username);
    if (username.length < 3 || username.length > 10) {
      toast.dismiss();
      toast.error("Username must be between 3 and 10 characters");
      return;
    }
    // check if the passwordRef is between 4 and 20 characters
    if (password.length < 4 || password.length > 20) {
      toast.dismiss();
      toast.error("Password should be 6 to 20 characters long.");
      return;
    }
    //  if all Ok then signin
    signin(username, password);
  };

  return (
    <div className="flex flex-col md:h-screen md:justify-center overflow-hidden md:relative ">
      <section>
        <img src={svgTwo} className=" w-70 pt-10 md:hidden" />
        <img
          src={shirt}
          className=" w-70 pt-10  absolute bottom-0 translate-y-16 -translate-x-12 rotate-45 opacity-20 hidden md:block "
        />
      </section>
      <section className=" flex flex-col items-center">
        <p className="text-black font-bold  text-6xl opacity-30 my-2 ml-8  leading-tight">
          welcome back!
        </p>
        <div className="py-4">
          <Input
            clearable
            underlined
            aria-labelledby="Username"
            placeholder="Username"
            className="w-92 h-12 "
            // helperText="between 4 and 10"
            contentRight={<UserIcon className="w-32" />}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Input.Password
            clearable
            underlined
            aria-labelledby="Password"
            placeholder="Password"
            visibleIcon={<LockOpenIcon fill="currentColor " className="w-32" />}
            hiddenIcon={<LockClosedIcon fill="currentColor" className="w-32" />}
            className="w-80 h-12  placeholder-black::placeholder"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isLoading ? (
          <button className=" bg-btnColor w-80 h-12 rounded text-white font-semibold mt-8">
            <Loading color={"currentColor"} />
          </button>
        ) : (
          <motion.button
            className=" bg-btnColor w-80 h-12 rounded text-white font-semibold mt-8"
            onClick={() => handelSignin()}
            whileTap={{ scale: 0.9 }}
          >
            Sign In
          </motion.button>
        )}
        <p className="text-btnColor flex mt-4 text-sm">
          Don't have an account ?
          <Link to="/signup" className="pl-2 font-semibold flex">
            sign up <LinkIcon className="w-4 pl-1" />
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

export default SignIn;
