import { Avatar } from "@nextui-org/react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import shirt from "../../../../../../../assets/closetAssets/shirtPlaceholder.svg";
const Post = ({ post, owner }) => {
  let currentOutfit = JSON.parse(post.Outfit);

  return (
    <div className="my-4 rounded bg-slate-100 p-2">
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
                    className="h-20 w-full border-2 border-slate-200 "
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
                    className="h-20 w-full border-2 border-slate-200 "
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
    </div>
  );
};

export default Post;
