import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import { Avatar, Loading } from "@nextui-org/react";
import { Tab } from "@headlessui/react";
import { useFollow } from "../HomePage/HomePageSections/hooks/useFollow";
import { FollowersContext } from "../HomePage/HomePageSections/context/FollowersContext";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/solid";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Navbar from "../HomePage/components/Navbar";
import { AuthContext } from "../AuthPage/context/AuthContext";
import { toast } from "react-hot-toast";
import { ProfileContext } from "./context/ProfileContext";
import Post from "../HomePage/HomePageSections/mainSection/components/TimeLine/components/PostComponents/Post";
import { Dialog } from "@headlessui/react";

const ProfilePageControls = () => {
  const { id } = useParams();
  const { profile, userData, getMyPost, changeProfilePic, isChangeLoading } =
    useProfile();
  const { follow, unfollow } = useFollow();
  const { user, activeUser } = useContext(AuthContext);
  const { following } = useContext(FollowersContext);
  const { myPost } = useContext(ProfileContext);
  let [isOpen, setIsOpen] = useState(false);
  // console.log(myPost);
  useEffect(() => {
    profile(id);
    getMyPost(id);
  }, [id]);
  // change profile pic handler if user is owner
  const [newProfilePic, setNewProfilePic] = useState(null);
  const handelChangeProfilePic = () => {
    const formData = new FormData();
    formData.append("profilePic", newProfilePic);
    formData.append("id", activeUser._id);
    changeProfilePic(formData);
  };

  // console.log(myPost);
  const handelFollow = () => {
    const tempUserObj = {
      username: userData.username,
      profilePic: userData.profilePic,
      _id: id,
    };
    follow(id, user.id, tempUserObj);
  };

  const handelUnfollow = () => {
    const tempUserObj = {
      username: userData.username,
      profilePic: userData.profilePic,
      _id: id,
    };
    unfollow(id, user.id, tempUserObj);
  };

  return (
    <div key={userData}>
      <Navbar />
      {userData ? (
        <div className="flex w-full flex-col items-center pt-14 ">
          <section className="mt-4  flex  flex-col items-center justify-between  md:w-2/5 md:flex-row">
            <div>
              {userData.profilePic === "" ? (
                <div className="relative mb-3 flex items-center  ">
                  <Avatar
                    src={`https://eu.ui-avatars.com/api/?name=${userData.username}&size=300`}
                    className=" cursor-pointer border-2 border-slate-400 p-1"
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  {userData.username === user.Username && (
                    <PencilSquareIcon
                      className="z-TOP1 absolute bottom-2 right-0 w-8 cursor-pointer rounded-full 
                  border border-slate-400 bg-white fill-slate-400 p-1"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="relative flex flex-col items-center md:flex-row">
                  <Avatar
                    src={userData.profilePic}
                    className="cursor-pointer border-2 border-slate-400 p-1"
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  {userData.username === user.Username && (
                    <PencilSquareIcon
                      className="z-TOP1 absolute bottom-2 right-0 w-8 cursor-pointer rounded-full 
                  border border-slate-400 bg-white fill-slate-400 p-1"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="z-TOP1 relative "
            >
              {/* The backdrop, rendered as a fixed sibling to the panel container */}
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

              {/* Full-screen container to center the panel */}
              <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="mx-auto flex h-80 w-72 max-w-sm flex-col items-center   rounded bg-white">
                  <Dialog.Title className="pt-2 font-bold">
                    Modify Profile picture
                  </Dialog.Title>
                  <Dialog.Description className="flex w-full flex-col items-center">
                    <label className=" p-2 ">
                      <section
                        className="bgPic flex h-32 w-32 flex-col items-center justify-center  rounded-full bg-slate-400"
                        style={{
                          width: "150px",
                          height: "150px",
                          backgroundImage: newProfilePic
                            ? `url(${URL.createObjectURL(newProfilePic)})`
                            : "",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        {newProfilePic ? null : (
                          <PhotoIcon className="h-10 w-10 text-white" />
                        )}
                      </section>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const pic = e.target.files[0];
                          setNewProfilePic(pic);
                        }}
                      />
                    </label>
                    {isChangeLoading ? (
                      <Loading size="md" />
                    ) : (
                      <button
                        className="mt-10 h-8 w-3/4 rounded bg-slate-400 font-semibold text-white"
                        onClick={() => {
                          handelChangeProfilePic();
                        }}
                      >
                        Set as profile picture
                      </button>
                    )}
                  </Dialog.Description>
                </Dialog.Panel>
              </div>
            </Dialog>
            <div className="flex flex-col   justify-center md:w-1/2 md:justify-start">
              <div className="flex  flex-col items-center text-center md:flex-row ">
                <p className="text-2xl ">{userData.username}</p>
                {userData.username !== user.Username ? (
                  (following && !following) ||
                  !following.some((user) => user._id === id) ? (
                    <button
                      className="  mt-4 rounded bg-slate-400 px-2 text-white  md:ml-16 md:mt-0"
                      onClick={() => {
                        handelFollow();
                      }}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className="  mt-4 rounded border-2 border-slate-400 px-2 text-slate-400  md:ml-16 md:mt-0"
                      onClick={() => {
                        handelUnfollow();
                      }}
                    >
                      Unfollow
                    </button>
                  )
                ) : // <button
                //   className="  mt-4 rounded border-2 border-slate-400 px-2 text-slate-400  md:ml-16 md:mt-0"
                //   onClick={() => {
                //     toast.error("Under development");
                //   }}
                // >
                //   Settings
                // </button>
                null}
              </div>
              <div className="my-4 flex w-full justify-between ">
                <p>
                  <span className="font-semibold">{userData.postCount}</span>{" "}
                  Post
                </p>
                <p className="mx-2">
                  <span className="font-semibold">
                    {userData.followers.length}
                  </span>{" "}
                  Followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userData.following.length}
                  </span>{" "}
                  Following
                </p>
              </div>
              <div>
                <div className=" flex justify-center md:justify-start">
                  Joined :
                  <p className="ml-2">
                    {formatDistanceToNow(new Date(userData.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-10 flex w-full flex-col items-center border-t-2">
            <Tab.Group>
              <Tab.List className=" flex w-52 overflow-hidden rounded-b">
                <Tab
                  className={({ selected }) =>
                    `flex-1  px-4 py-2 text-center font-medium ${
                      selected
                        ? "border-t-2 border-slate-800 bg-slate-200 "
                        : "  bg-gray-300 text-gray-700"
                    }`
                  }
                >
                  Post
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `flex-1 px-4 py-2 text-center font-medium ${
                      selected
                        ? "border-t-2 border-slate-800 bg-slate-200 "
                        : " bg-gray-300 text-gray-700"
                    }`
                  }
                >
                  Closet
                </Tab>
              </Tab.List>
              <Tab.Panels className="w-full bg-white p-4">
                <Tab.Panel>
                  <div className="flex flex-col items-center ">
                    {myPost && myPost.length > 0 ? (
                      myPost.map((post, i) => (
                        <div className="w-full md:w-2/4" key={i}>
                          <Post post={post} owner={userData} />
                        </div>
                      ))
                    ) : (
                      <div className="mt-4 flex items-center justify-center">
                        <p className="text-lg font-bold">No posts yet</p>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  {userData && userData.inventory.length > 0 ? (
                    <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-10">
                      {userData.inventory.map((item) => (
                        <div
                          key={item.clothId}
                          className="flex flex-col justify-center rounded border-2 p-2"
                        >
                          <div
                            style={{
                              backgroundImage: `url(${item.image})`,
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              height: "10rem",
                              // Adjust the height as needed
                            }}
                          ></div>
                          <p className="h-15 w-full text-center text-base">
                            {item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className=" mt-4 flex items-center justify-center">
                      <p className="text-lg font-bold">Inventory is empty</p>
                    </div>
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </section>
        </div>
      ) : (
        <div className="h-screen w-screen ">
          <Loading size="md" />
        </div>
      )}
    </div>
  );
};

export default ProfilePageControls;
