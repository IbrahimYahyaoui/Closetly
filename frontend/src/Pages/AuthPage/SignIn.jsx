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
import { Link, useNavigate } from "react-router-dom";
import { LoaderIcon, toast } from "react-hot-toast";
const SignIn = () => {
  // check if user existe
  // if user existe then redirect to home page
  const navigate = useNavigate();
  if (localStorage.getItem("user")) {
    navigate("/home", { replace: true });
  }
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
    <div className="flex flex-col overflow-hidden md:relative md:h-screen md:justify-center ">
      <section>
        <img src={svgTwo} className=" w-70 pt-10 md:hidden" />
        <img
          src={shirt}
          className=" w-70 absolute  bottom-0 hidden -translate-x-12 translate-y-16 rotate-45 pt-10 opacity-20 md:block "
        />
      </section>
      <section className=" flex flex-col items-center ">
        <p className="my-2 ml-8  text-6xl font-bold leading-tight text-black  opacity-30">
          welcome back!
        </p>
        <div className="py-4">
          <Input
            clearable
            underlined
            aria-labelledby="Username"
            placeholder="Username"
            className=" h-12 w-80"
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
            className="placeholder-black::placeholder h-12  w-80"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isLoading ? (
          <button className=" mt-8 h-12 w-80 rounded bg-btnColor font-semibold text-white">
            <Loading color={"currentColor"} />
          </button>
        ) : (
          <motion.button
            className=" mt-8 h-12 w-80 rounded bg-btnColor font-semibold text-white"
            onClick={() => handelSignin()}
            whileTap={{ scale: 0.9 }}
          >
            Sign In
          </motion.button>
        )}
        <p className="mt-4 flex text-sm text-btnColor">
          Don't have an account ?
          <Link to="/signup" className="flex pl-2 font-semibold">
            sign up <LinkIcon className="w-4 pl-1" />
          </Link>
        </p>
        <div className="   fixed bottom-0 mb-5 flex flex-col items-center text-2xl opacity-40">
          <p className="LogoFont mx-2">closetly</p>
          <p className="pt-2 text-xs   font-bold opacity-60">
            Your virtual closet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
