import React, { useContext, useEffect, useRef, useState } from "react";
import WelcomeText from "./components/WelcomeText";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTimeline } from "./hooks/useTimeline";
import { TimelineContext } from "./Context/TimelineContext";
import { Waypoint } from "react-waypoint";
import { set } from "date-fns";
import Post from "./components/Post";
import { FollowersContext } from "../../../context/FollowersContext";
import { useInView } from "framer-motion";

const Timeline = () => {
  const { fetchTimeline } = useTimeline();
  const { TimelinePosts, postCount, pageCount } = useContext(TimelineContext);
  const { following } = useContext(FollowersContext);
  const [page, setPage] = useState(0);
  const [noMoreData, setNoMoreData] = useState(false);
  const contentRef = useRef(null);

  const fetchMoreData = () => {
    if (page > pageCount) {
      setNoMoreData(true);
      return;
    }
    setPage(page + 1);
    // console.log(page, pageCount);

    fetchTimeline(page);
  };

  useEffect(() => {
    // if (TimelinePosts.length >= postCount) return;
    fetchMoreData();
  }, [following]);

  const getOwner = (userId) => {
    return following.find((user) => user._id === userId);
  };

  return (
    <div className="hide-scrollbar  md:h-screen md:overflow-scroll">
      <div className="hidden md:block">
        <WelcomeText />
      </div>
      <div className="content">
        {TimelinePosts &&
          TimelinePosts.map((post, i) => (
            <Post key={i} post={post} owner={getOwner(post.UserId)} />
          ))}
      </div>
      {!noMoreData ? (
        <Waypoint onEnter={fetchMoreData}>
          <div>more</div>
        </Waypoint>
      ) : (
        <div className="text-center md:mb-20 ">
          <p className="font-bold uppercase">no more data</p>
          <p className="">
            this app is experimental app and don't have that much posts
          </p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
