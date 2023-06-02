import { motion } from "framer-motion";
import React, { useContext } from "react";
import Tshirt from "../../../../assets/wear.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
import { FollowersContext } from "../context/FollowersContext";
import { Avatar } from "@nextui-org/react";
import { useFollow } from "../hooks/useFollow";
const RightSection = () => {
  const { user: existUser } = useContext(AuthContext);
  const { suggestions, following } = useContext(FollowersContext);
  const navigate = useNavigate();

  const { follow, unfollow } = useFollow();

  const followHandler = (destinationId, sourceId, tempUserObj) => {
    follow(destinationId, sourceId, tempUserObj);
  };
  const unfollowHandler = (destinationId, sourceId, tempUserObj) => {
    console.log(tempUserObj, "tempUserObj");
    unfollow(destinationId, sourceId, tempUserObj);
  };
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
          {/* <p className="cursor-pointer text-xs">sell all</p> */}
        </h3>
        <div>
          {suggestions &&
            suggestions.map((user) => {
              if (user && user.username !== existUser.Username) {
                return (
                  <div
                    className="flex cursor-pointer items-center justify-between px-2 pt-3"
                    key={user._id}
                  >
                    <div
                      className="flex  items-center"
                      onClick={() => {
                        console.log(user._id);
                        return navigate(`/profile/${user._id}`);
                      }}
                    >
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
                    {following &&
                    // check if user is already following this user
                    !following.some(
                      (followingUser) =>
                        followingUser && followingUser._id === user._id
                    ) ? (
                      <button
                        className="rounded-md bg-btnColor px-2  text-white"
                        onClick={() => {
                          followHandler(user._id, existUser.id, user);
                        }}
                      >
                        follow
                      </button>
                    ) : (
                      <button
                        className=" rounded-md border-2  border-slate-500 px-2 text-slate-500"
                        onClick={() => {
                          unfollowHandler(user._id, existUser.id, user);
                        }}
                      >
                        unfollow
                      </button>
                    )}
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
