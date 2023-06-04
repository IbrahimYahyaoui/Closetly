import { Avatar, Textarea } from "@nextui-org/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import shirt from "../../../../../../../../assets/closetAssets/shirtPlaceholder.svg";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  MinusSmallIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../../../../AuthPage/context/AuthContext";
import { usePost } from "./hooks/usePost";
import { TimelineContext } from "../../Context/TimelineContext";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import clickSound from "../../../../../../../../assets/soundEffect/press.mp3";
import { ProfileContext } from "../../../../../../../profilePage/context/ProfileContext";
const Post = ({ post, owner }) => {
  // console.log(owner);
  let currentOutfit = JSON.parse(post.Outfit);
  const { activeUser } = useContext(AuthContext);
  const { TimelinePosts, dispatch } = useContext(TimelineContext);
  const { dispatch: profileDispatch } = useContext(ProfileContext);
  const [isFocus, setIsFocus] = useState(false);
  const [comment, setComment] = useState("");
  const { addComment, addLike, addDislike } = usePost();
  const commentRef = useRef();
  const [play] = useSound(clickSound, {
    volume: 0.2,
  });
  const [isLiked, setIsLiked] = useState();
  const [isDisliked, setIsDisliked] = useState();
  useEffect(() => {
    if (activeUser) {
      const isLikedIndex = post.likes.some(
        (like) => like.likerId === activeUser._id
      );
      setIsLiked(isLikedIndex);
    }
    if (activeUser) {
      const isDislikedIndex = post.dislikes.some(
        (dislike) => dislike.dislikerId === activeUser._id
      );
      setIsDisliked(isDislikedIndex);
    }
  }, [activeUser, post]);

  const handleAddComment = (postId, posterId, comment, poster) => {
    dispatch({
      type: "ADD_COMMENT",
      payload: {
        postId,
        posterId,
        comment,
        poster,
        profilePic: activeUser.profilePic,
      },
    });
    profileDispatch({
      type: "ADD_COMMENT",
      payload: {
        postId,
        posterId,
        poster,
        comment,
        profilePic: activeUser.profilePic,
      },
    });
    addComment(postId, posterId, comment, poster);
    commentRef.current.value = "";
    setComment("");
  };
  const [showAllComments, setShowAllComments] = useState(false);
  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };
  const renderedComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 3);

  const handleLike = (postId, likerId, liker) => {
    addLike(postId, likerId, liker);
    dispatch({
      type: "ADD_LIKE",
      payload: {
        postId,
        likerId,
        liker,
      },
    });
    profileDispatch({
      type: "ADD_LIKE",
      payload: {
        postId,
        likerId,
        liker,
      },
    });
  };

  const handleDislike = (postId, dislikerId, disliker) => {
    addDislike(postId, dislikerId, disliker);
    dispatch({
      type: "ADD_DISLIKE",
      payload: {
        postId,
        dislikerId,
        disliker,
      },
    });
    profileDispatch({
      type: "ADD_DISLIKE",
      payload: {
        postId,
        dislikerId,
        disliker,
      },
    });
  };

  return (
    <div className="my-4 rounded bg-slate-200 p-2">
      {/* username and profile pic */}
      {owner && (
        <Link to={`/profile/${owner._id}`} className="flex items-center">
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
        </Link>
      )}

      {/* description and outfit */}
      <div>
        <p className="my-3">{post.Description}</p>
        <div className="grid w-full grid-cols-3 place-items-center overflow-hidden rounded border-2 text-center">
          {currentOutfit &&
            Array.from({ length: 12 }).map((_, i) => {
              if (currentOutfit[i].indexOf("shirtPlaceholder") < 0) {
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

      {/* reaction */}
      <div className="pt-4">
        <div className="flex justify-between">
          <div className="flex">
            <div
              className={`mr-2 flex w-16 cursor-pointer items-center justify-between rounded-full border-2 border-slate-400 px-2 ${
                isLiked ? "border-2 border-black  text-black" : ""
              }`}
              onClick={() => {
                handleLike(post._id, activeUser._id, activeUser.username);
                play();
              }}
            >
              <HandThumbUpIcon
                className={`h-5 w-4  stroke-black  ${
                  isLiked ? " fill-black" : "fill-none"
                }`}
              />
              <p className="w-2/3 text-center">{post && post.likes.length}</p>
            </div>

            <div
              className={`flex w-16 cursor-pointer items-center justify-between rounded-full border-2 border-slate-400 px-2 ${
                isDisliked ? "border-2 border-black  text-black" : ""
              }`}
              onClick={() => {
                handleDislike(post._id, activeUser._id, activeUser.username);
                play();
              }}
            >
              <HandThumbDownIcon
                className={`h-5 w-4  stroke-black  ${
                  isDisliked ? " fill-black" : "fill-none"
                }`}
              />
              <p className="w-2/3 text-center">
                {post && post.dislikes.length}
              </p>
            </div>
          </div>
          <div className="flex opacity-60">{post.comments.length} Comment</div>
        </div>

        {/* Render comments */}
        <div className="flex w-full flex-col">
          {renderedComments &&
            renderedComments.map((comment, i) => (
              <div key={i} className="flex items-start pt-4">
                <div className="ml-1 flex w-full items-start rounded">
                  <Link to={`/profile/${comment.posterId}`}>
                    {comment.profilePic === "" ? (
                      <Avatar
                        src={`https://eu.ui-avatars.com/api/?name=${comment.poster}&size=300`}
                        className="cursor-pointer"
                      />
                    ) : (
                      <Avatar
                        src={renderedComments && comment.profilePic}
                        className="cursor-pointer"
                      />
                    )}
                  </Link>

                  <div className="ml-2 mt-2 w-full">
                    <p>{comment.poster}</p>
                    <p className=" mt-2 w-full rounded-md bg-slate-100 p-2">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {post.comments.length > 3 && (
            <div className="mt-2 w-fit cursor-pointer self-center rounded border-2 border-slate-400 p-1 text-slate-700 focus:outline-none">
              {showAllComments ? (
                <p onClick={toggleShowAllComments}>Show Less</p>
              ) : (
                <div onClick={toggleShowAllComments} className="flex">
                  Show All Comments
                  <p className="ml-2">({post.comments.length})</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add comment */}
        <div className="relative flex items-start pt-4">
          <div className="ml-1 h-10">
            {activeUser && activeUser.profilePic === "" ? (
              <Avatar
                src={`https://eu.ui-avatars.com/api/?name=${
                  activeUser && activeUser.username
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
          <div className="flex w-full flex-col items-end px-2">
            <Textarea
              className="rounded-full"
              placeholder="Write a comment"
              maxLength={300}
              width="100%"
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              ref={commentRef}
              aria-labelledby="comment"
            />
            {(isFocus || comment.length > 0) && (
              <button
                className="mt-2 cursor-pointer rounded bg-slate-500 px-8 py-2 text-white"
                onClick={() => {
                  if (comment === "") {
                    toast.success("Comment is empty");
                  } else {
                    handleAddComment(
                      post._id,
                      activeUser._id,
                      comment,
                      activeUser.username
                    );
                  }
                }}
              >
                <PaperAirplaneIcon className="w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
