import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import { Avatar, Loading } from "@nextui-org/react";
import { Tab } from "@headlessui/react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Navbar from "../HomePage/components/Navbar";
const ProfilePageControls = () => {
  const { id } = useParams();
  const { profile, userData } = useProfile();

  const location = useLocation();
  useEffect(() => {
    profile(id);
    console.log(userData);
  }, [id]);

  return (
    <div key={userData}>
      <Navbar />
      {userData ? (
        <div className="flex w-full flex-col items-center pt-14 ">
          <section className="mt-4  flex  flex-col items-center justify-between  md:w-2/5 md:flex-row">
            <div>
              {userData.profilePic === "" ? (
                <div className="mb-3 flex items-center ">
                  <Avatar
                    src={`https://eu.ui-avatars.com/api/?name=${userData.username}&size=300`}
                    className="cursor-pointer"
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center md:flex-row">
                  <Avatar
                    src={userData.profilePic}
                    className="cursor-pointer"
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col   justify-center md:justify-start">
              <div className="flex  flex-col items-center text-center md:flex-row ">
                <p className="text-2xl ">{userData.username}</p>
                <button className="  mt-4 rounded bg-slate-400 px-2 text-white  md:ml-16 md:mt-0">
                  Follow
                </button>
              </div>
              <div className="my-4 flex w-full justify-between ">
                <p>
                  <span className="font-semibold">
                    {userData.inventory.length}
                  </span>{" "}
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
                  following
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
              <Tab.Panels className="bg-white p-4">
                <Tab.Panel>
                  <p>Content 1</p>
                </Tab.Panel>
                <Tab.Panel>
                  <p>Content 2</p>
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
