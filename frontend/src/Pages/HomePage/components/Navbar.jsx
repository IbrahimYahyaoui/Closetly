import { Avatar, Badge, Dropdown, Loading, User } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthPage/context/AuthContext";
import {
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  HeartIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { useLogout } from "../../AuthPage/hooks/useLogout";
import { Link, useNavigate, redirect } from "react-router-dom";
import { UseSearch } from "./hooks/UseSearch";
import { Dialog } from "@headlessui/react";
import { SearchContext } from "./context/SearchContext";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handelLogout = () => {
    logout();
  };
  //
  const [isOpen, setIsOpen] = useState(false);

  const { search, isLoading } = UseSearch();
  const [searchValue, setSearchValue] = useState("");
  const { searchResult } = useContext(SearchContext);
  const handelSearch = () => {
    if (searchValue !== "") {
      search(searchValue);
    } else {
      toast.error("please enter a username");
    }
  };
  return (
    <nav className="z-TOP   fixed  flex w-full  justify-between border-b-2 bg-white p-2 pb-1 ">
      <Link to="/home" className="LogoFont w-1/3  text-2xl opacity-70 ">
        closetly
      </Link>
      <section className="flex w-2/3  justify-end  ">
        <div className="flex  w-full  items-center justify-end ">
          {/* search on phone */}
          <div>
            <MagnifyingGlassIcon
              className="mr-3 w-5 cursor-pointer "
              onClick={() => {
                setIsOpen(true);
              }}
            />
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="z-TOP relative "
            >
              {/* The backdrop, rendered as a fixed sibling to the panel container */}
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

              {/* Full-screen container to center the panel */}
              <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="mx-auto  w-full max-w-sm rounded bg-white p-2 text-center">
                  <Dialog.Title className="py-4 font-bold">
                    Search for user
                  </Dialog.Title>

                  <div className="flex w-full">
                    <input
                      className=" h-8 w-4/5 rounded-l border pl-1 outline-none "
                      placeholder="username"
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                    />
                    {isLoading ? (
                      <div className="flex w-1/5 cursor-pointer items-center justify-center rounded-r bg-slate-400">
                        <Loading size="xs" color="white" />
                      </div>
                    ) : (
                      <div
                        className="flex w-1/5 cursor-pointer items-center justify-center rounded-r bg-slate-400"
                        onClick={() => {
                          handelSearch();
                        }}
                      >
                        <MagnifyingGlassIcon className="w-6  " />
                      </div>
                    )}
                  </div>
                  {(searchResult && searchResult === "empty") ||
                  (searchResult && searchResult.length === 0) ? (
                    <div className="my-4 h-60  overflow-scroll rounded border">
                      <p className="flex h-full items-center justify-center text-sm text-gray-500">
                        provide a valid username for search
                      </p>
                    </div>
                  ) : (
                    <div className=" my-4 h-60  overflow-scroll rounded border">
                      {searchResult &&
                        searchResult.map((user) => {
                          return (
                            <div
                              // to={`/profile/${user._id}`}
                              className="flex items-center justify-between px-2 pt-3"
                              key={user._id}
                              onClick={() => {
                                setIsOpen(false);
                                return navigate(`/profile/${user._id}`);
                              }}
                            >
                              <div className="flex items-center">
                                {user.profilePic === "" ? (
                                  <div className="flex items-center">
                                    <Avatar
                                      src={`https://eu.ui-avatars.com/api/?name=${user.username}&size=300`}
                                      className="cursor-pointer"
                                    />
                                    <p className="mx-2 text-sm font-semibold">
                                      {user.username}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <Avatar
                                      src={user.profilePic}
                                      className="cursor-pointer"
                                    />
                                    <p className="mx-2 text-sm font-semibold">
                                      {user.username}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>
          <div>
            <Dropdown placement="bottom-right  ">
              <Dropdown.Button
                className="p-0 "
                style={{
                  background: "transparent",
                }}
              >
                <Badge color="error" content={12} className="ml-2">
                  <BellIcon className=" w-6  cursor-pointer fill-none  stroke-black " />
                </Badge>
              </Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="new">
                  <p>hello</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {user && (
          <div className="mr-2 flex items-center">
            <p className=" mr-4 h-8 w-1 rounded bg-slate-300  opacity-50"></p>
            <Menu
              // menu styles
              menuStyle={{
                borderRadius: "0.5rem",
                marginTop: "0.6rem",
                marginRight: "0.5rem",
                backgroundColor: "white",
              }}
              menuButton={
                <MenuButton className="flex cursor-pointer  items-center">
                  <Avatar
                    src={`https://eu.ui-avatars.com/api/?name=${user.Username}&size=300`}
                    // name={user.Username}
                    className="cursor-pointer"
                  />
                  {/* <p className="mx-2 font-semibold text-sm">
                    {user && user.Username}
                  </p> */}
                  <ChevronDownIcon className="ml-2 w-4" />
                </MenuButton>
              }
              transition
            >
              <Link to={`/profile/${user.id}`} className="self-start">
                <MenuItem className="flex h-8 items-end  ">
                  <UserCircleIcon className="mr-5 w-5 self-start" /> Profile
                </MenuItem>
              </Link>
              <MenuItem
                className="flex h-8  items-center pt-3 "
                onClick={() => handelLogout()}
              >
                <ArrowRightOnRectangleIcon className="self-star mr-5 w-5 " />
                <p className=""> logout</p>
              </MenuItem>
              <MenuItem className="flex h-8 items-end pt-3 " disabled>
                <CogIcon className="mr-5 w-5 self-start" />
                <p className="self-start">V 0.0.1(beta)</p>
              </MenuItem>
            </Menu>
          </div>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
