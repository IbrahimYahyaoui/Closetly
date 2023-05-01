import React from "react";
import Navbar from "./components/Navbar";
import ClosetlyButton from "./components/ClosetlyButton";
import LeftSection from "./HomePageSections/leftSection/LeftSection";
import MainSection from "./HomePageSections/mainSection/MainSection";
import RightSection from "./HomePageSections/rightSection/RightSection";

const HomePage = () => {
  return (
    <div className="">
      <>
        <div className=" ">
          <Navbar />
        </div>
        {/*  */}
        <div className="flex">
          <section className=" flex-none w-1/4 border-r-2 hidden lg:block pt-16   ">
            <LeftSection />
          </section>
          <section className=" shrink col-span-4  pt-16">
            <MainSection />
          </section>
          <section className=" flex-none w-1/4 border-l-2 hidden lg:block  pt-16 ">
            <RightSection />
          </section>
        </div>
      </>
    </div>
  );
};

export default HomePage;
