import React, { useContext } from "react";
import { AuthContext } from "../../../../../../AuthPage/context/AuthContext";

const WelcomText = () => {
  let timeOfDay;
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "night";
  }

  const { user } = useContext(AuthContext);
  return (
    <p className="mb-4 w-full text-xl font-semibold leading-snug lg:text-2xl xl:text-3xl">
      Good {timeOfDay}! {user && user.Username}
    </p>
  );
};

export default WelcomText;
