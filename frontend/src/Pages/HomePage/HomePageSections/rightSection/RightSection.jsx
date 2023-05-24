import { motion } from "framer-motion";
import React, { useContext } from "react";
import Tshirt from "../../../../assets/wear.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
import { FollowersContext } from "../mainSection/components/followe/context/FollowersContext";
import { Avatar } from "@nextui-org/react";
const RightSection = () => {
  const { user: existUser } = useContext(AuthContext);
  const { suggestions } = useContext(FollowersContext);
  console.log(suggestions.userList);
  return (
    <div className="flex  flex-col items-center px-3  ">
      <div className="  flex  h-fit w-full  flex-col items-center rounded-md border-2  p-2   font-semibold">
        <p className="opacity-80">
          Create your own virtual closet by uploading pictures of your own
          clothes. Explore and discover your personal style and then share it
          with others.
        </p>
        <Link
          to="/closet"
          className="relative my-4 flex h-12 w-full items-center justify-center rounded bg-btnColor font-semibold capitalize text-white  "
        >
          <img
            src={Tshirt}
            className="absolute -bottom-1  -left-3 w-8  rotate-45 text-white opacity-60"
          />
          visit your closet
        </Link>
      </div>
      {/* Friends List suggestion */}
      <div className="mt-10 h-80 w-full scroll-m-10 overflow-y-scroll rounded-md border-2 ">
        <h3 className="m-4 flex cursor-pointer items-center justify-between font-semibold">
          <p>people you might know</p>
          <p className="cursor-pointer text-xs">sell all</p>
        </h3>
        <div>
          {suggestions.userList &&
            suggestions.userList.map((user) => {
              if (user.username !== existUser.Username) {
                return (
                  <div
                    className="flex items-center justify-between px-2 pt-3"
                    key={user._id}
                  >
                    <div className="flex items-center">
                      {user.profilePic === "" ? (
                        <Avatar
                          src={`https://eu.ui-avatars.com/api/?name=${user.username}&size=300`}
                          className="cursor-pointer"
                        />
                      ) : (
                        <Avatar
                          src={user.profilePic}
                          className="cursor-pointer"
                        />
                      )}
                      <p className="pl-2">{user.username}</p>
                    </div>
                    <button className="rounded-md bg-btnColor px-2  text-white">
                      follow
                    </button>
                  </div>
                );
              }
              return null; // Add this line if you don't want to render anything for other cases
            })}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
