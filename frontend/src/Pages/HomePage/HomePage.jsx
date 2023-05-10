import React from "react";
import Navbar from "./components/Navbar";
import ClosetlyButton from "./components/ClosetlyButton";
// import LeftSection from "./HomePageSections/leftSection/LeftSection";
import MainSection from "./HomePageSections/mainSection/MainSection";
import RightSection from "./HomePageSections/rightSection/RightSection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const HomePage = () => {
  // if user don't exist then redirect to auth page
  const navigate = useNavigate();
  if (!localStorage.getItem("user")) {
    navigate("/", { replace: true });
    // toast("welcome back to closetly ");
  }
  return (
    <div className="">
      <>
        <Navbar />

        {/*  */}
        <div className=" flex justify-center">
          <div className="flex pt-20 lg:w-body ">
            <div className="w-3/3 overflow-hidden bg-white p-2 md:w-2/3">
              <MainSection />
            </div>
            <div className="hidden w-1/3 md:block">
              <RightSection />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default HomePage;
