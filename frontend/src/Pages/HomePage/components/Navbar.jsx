import { Avatar, Badge, Dropdown, User } from "@nextui-org/react";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthPage/context/AuthContext";
import {
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  HeartIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { motion } from "framer-motion";
import { useLogout } from "../../AuthPage/hooks/useLogout";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const handelLogout = () => {
    logout();
  };
  return (
    <nav className="fixed   z-50  flex w-full  justify-between border-b-2 bg-white p-2 pb-1 ">
      <div className="LogoFont w-1/3  text-2xl opacity-70 ">closetly</div>
      <section className="flex w-2/3 items-center justify-end ">
        <div className="flex  w-16 items-center justify-between ">
          <div>
            <Dropdown placement="bottom-right ">
              <Dropdown.Button
                className="p-0"
                style={{
                  background: "transparent",
                }}
              >
                <Badge color="error" content={0}>
                  <HeartIcon className=" w-6  cursor-pointer fill-none  stroke-black" />
                </Badge>
              </Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="delete" withDivider color="error">
                  Delete file
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown placement="bottom-right ">
              <Dropdown.Button
                className="p-0 "
                style={{
                  background: "transparent",
                }}
              >
                <Badge color="error" content={0} className="mr-2">
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
            <p className="mx-4 ml-5 h-8 w-1 rounded bg-slate-300  opacity-50"></p>
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
              <MenuItem className="flex h-8 items-end  ">
                <UserCircleIcon className="mr-5 w-5 self-start" />
                <p className="self-start"> Profile</p>
              </MenuItem>
              <MenuItem className="flex h-8 items-end pt-3 ">
                <ArrowRightOnRectangleIcon className="mr-5 w-5 self-start" />
                <p className="self-start" onClick={() => handelLogout()}>
                  {" "}
                  logout
                </p>
              </MenuItem>
              <MenuItem className="flex h-8 items-end pt-3 " disabled>
                <CogIcon className="mr-5 w-5 self-start" />
                <p className="self-start">V 0.0.1(beta)</p>
              </MenuItem>
            </Menu>
          </div>
        )}
        {/* <button className=" hidden md:block bg-btnColor px-10 py-2 rounded-xl text-white font-semibold  mx-2 ml-10 ">
            Open your wardrobe
          </button> */}
      </section>
    </nav>
  );
};

export default Navbar;
