import React from "react";
import Navbar from "./components/Navbar";

// import LeftSection from "./HomePageSections/leftSection/LeftSection";
import MainSection from "./HomePageSections/mainSection/MainSection";
import RightSection from "./HomePageSections/rightSection/RightSection";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // if user don't exist then redirect to auth page
  const navigate = useNavigate();
  if (!localStorage.getItem("user")) {
    navigate("/", { replace: true });
    // toast("welcome back to closetly ");
  }
  return (
    <div className="md:h-screen md:overflow-hidden">
      <>
        <Navbar />

        {/*  */}
        <div className=" flex justify-center">
          <div className="flex pt-20 lg:w-body ">
            <div className="w-3/3 overflow-hidden  bg-white p-2 md:w-2/3">
              <MainSection />
            </div>
            <div className=" hidden w-1/3  md:block">
              <RightSection />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default HomePage;
