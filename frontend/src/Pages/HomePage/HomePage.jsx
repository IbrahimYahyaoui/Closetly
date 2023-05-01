import React from "react";
import Navbar from "./components/Navbar";
import ClosetlyButton from "./components/ClosetlyButton";
// import LeftSection from "./HomePageSections/leftSection/LeftSection";
import MainSection from "./HomePageSections/mainSection/MainSection";
import RightSection from "./HomePageSections/rightSection/RightSection";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // if user don't exist then redirect to auth page
  const navigate = useNavigate();
  if (!localStorage.getItem("user")) {
    navigate("/", { replace: true });
  }
  return (
    <div className="">
      <>
        <Navbar />

        {/*  */}
        <div className=" flex justify-center">
          <div className="lg:w-body flex pt-24 ">
            <div className="w-3/3 md:w-2/3 p-2 bg-white">
              <MainSection />
            </div>
            <div className="w-1/3 hidden md:block">
              <RightSection />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default HomePage;
