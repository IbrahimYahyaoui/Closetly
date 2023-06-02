import React, { useContext, useEffect, useRef, useState } from "react";
import WelcomeText from "./components/WelcomeText";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTimeline } from "./hooks/useTimeline";
import { TimelineContext } from "./Context/TimelineContext";
import { Waypoint } from "react-waypoint";
import { set } from "date-fns";
import Post from "./components/Post";
import { FollowersContext } from "../../../context/FollowersContext";

const Timeline = () => {
  const { fetchTimeline } = useTimeline();
  const { TimelinePosts, postCount, pageCount } = useContext(TimelineContext);
  const { following } = useContext(FollowersContext);
  const [page, setPage] = useState(0);

  const fetchMoreData = () => {
    fetchTimeline(page + 1);
  };

  useEffect(() => {
    fetchTimeline(1);
    setPage(2);
  }, []);

  const getOwner = (userId) => {
    return following.find((user) => user._id === userId);
  };

  return (
    <div className="hide-scrollbar md:h-screen md:overflow-scroll">
      <div className="hidden md:block">
        <WelcomeText />
      </div>
      <div className="">
        {TimelinePosts &&
          TimelinePosts.map((post) => (
            <Post key={post._id} post={post} owner={getOwner(post.UserId)} />
          ))}

        <Waypoint
          onEnter={() => {
            setPage(page + 1);
            fetchTimeline(page);
          }}
        >
          <div>Some content here</div>
        </Waypoint>
      </div>
    </div>
  );
};

export default Timeline;
