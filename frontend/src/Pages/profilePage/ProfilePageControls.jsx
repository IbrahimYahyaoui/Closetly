import React from "react";
import { useParams } from "react-router-dom";

const ProfilePageControls = () => {
  const { id } = useParams();
  return <div>{id && id}</div>;
};

export default ProfilePageControls;
