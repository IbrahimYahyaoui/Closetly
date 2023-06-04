import React, { useContext } from "react";
import { AuthContext } from "../../../../../../AuthPage/context/AuthContext";

const WelcomeText = () => {
  let timeOfDay;
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  const { user } = useContext(AuthContext);
  return (
    <div>
      <p className="mb-4 w-full text-xl font-semibold leading-snug lg:text-2xl xl:text-3xl">
        Good {timeOfDay}! {user && user.Username}
      </p>
      <div className="my-2 h-40 overflow-x-scroll  rounded border-2 p-2">
        <p className="text-2xl font-bold">
          Read before Start test this website
        </p>
        <p>
          the idea behind this website is merged the ideas of social media and a
          Closet app to create a platform where users can upload clothes, create
          outfits, and share them with others. It combines fashion inspiration
          with social interaction, allowing users to and engage in a
          fashion-oriented community.
        </p>
        <p className="pt-2">
          <p className="font-bold">technologies :</p> viteJs(React) ,
          tailwindCSS , nodeJs , express , MongoDb {"==>"}
          MERN
        </p>
        <p className="font-bold">
          ⚠️ this website is a personal project in beta release so you my find
          some bugs maybe ill fix them in the future⚠️
        </p>
        if you have any suggestions or feedback please contact me on
        <p>ibrahimbnhs@gmail.com</p>
        <p>now visit your closet and start build your outfit</p>
      </div>
    </div>
  );
};

export default WelcomeText;
