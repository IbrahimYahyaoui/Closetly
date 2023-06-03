import { Avatar } from "@nextui-org/react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import shirt from "../../../../../../../assets/closetAssets/shirtPlaceholder.svg";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  MinusSmallIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AuthContext } from "../../../../../../AuthPage/context/AuthContext";
const Post = ({ post, owner }) => {
  let currentOutfit = JSON.parse(post.Outfit);
  const { activeUser } = useContext(AuthContext);
  // console.log(user, "currentOutfit");
  return (
    <div className="my-4 rounded bg-slate-200 p-2">
      {/* username and porfile pic */}
      <div className="flex items-center">
        <div>
          {owner && owner.profilePic === "" ? (
            <Avatar
              src={`https://eu.ui-avatars.com/api/?name=${
                owner && owner.username
              }&size=300`}
              className="cursor-pointer"
            />
          ) : (
            <Avatar
              src={owner && owner.profilePic}
              className="cursor-pointer"
            />
          )}
        </div>
        <div className="ml-2 flex flex-col">
          <p className="font-semibold">{owner && owner.username}</p>
          <p className="text-xs font-normal">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      {/* username and porfile pic end */}
      {/*  */}
      {/* description and outfit */}
      <div>
        <p className="my-3">{post.Description}</p>
        <div className=" grid w-full grid-cols-3 place-items-center overflow-hidden rounded border-2 text-center ">
          {currentOutfit &&
            Array.from({ length: 12 }).map((_, i) => {
              if (currentOutfit[i].indexOf("shirtPlaceholder") < 0) {
                // console.log(currentOutfit[i], "i");
                return (
                  <div
                    key={i}
                    className="h-20 w-full border-2 border-slate-300 "
                    style={{
                      backgroundImage: `url(${currentOutfit[i]})`,
                      backgroundSize: "60px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              } else {
                return (
                  <div
                    key={i}
                    className="h-20 w-full border-2 border-slate-300 "
                    style={{
                      backgroundImage: `url(${shirt})`,
                      backgroundSize: "10px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                );
              }
            })}
        </div>
      </div>
      {/* reaction  */}
      <div className=" pt-4">
        <div className="flex justify-between ">
          <div className="flex">
            <p className="mr-2 flex w-16 cursor-pointer items-center  justify-between rounded-full border-2 border-slate-400 px-2">
              <HandThumbUpIcon className=" h-5 w-4  fill-none stroke-black" />
              <p>126</p>
            </p>

            <p className="flex w-16 cursor-pointer items-center justify-between  rounded-full border-2 border-slate-400 px-2">
              <HandThumbDownIcon className=" h-5 w-4  fill-none stroke-black" />
              <p>126</p>
            </p>
            {/* <p></p> */}
          </div>
          <div className="flex opacity-60">126 Comment</div>
        </div>
        {/* <div>post comment</div> */}
        <div className="relative flex items-center pt-4">
          <div className="absolute ml-1">
            {activeUser && activeUser.profilePic === "" ? (
              <Avatar
                src={`https://eu.ui-avatars.com/api/?name=${
                  activeUser && activeUser.Username
                }&size=300`}
                className="cursor-pointer"
              />
            ) : (
              <Avatar
                src={activeUser && activeUser.profilePic}
                className="cursor-pointer"
              />
            )}
          </div>
          <input
            className=" h-12 w-full  rounded-full pl-14 "
            placeholder="write a comment"
            maxLength={60}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
