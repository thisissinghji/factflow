import React, { useEffect, useState, useRef } from "react";
import { NextPage } from "next";
import { Video } from "../types";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
  hideUserInfo?: boolean;
  smallCard?: boolean;
  hideControls?: boolean;
}

const VideoCard: NextPage<IProps> = ({
  post,
  isShowingOnHome,
  hideUserInfo,
  smallCard = false,
  hideControls = false,
}) => {
  const [isHover, setisHover] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [isMuted, setisMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setisPlaying(false);
    } else {
      videoRef?.current?.play();
      setisPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div
      className={`flex flex-col pb-6 ${smallCard ? "flex-row md:w-1/3 " : ""}`}
    >
      <div>
        {!hideUserInfo && (
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile-photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 items-center md:text-md font bold text-primary">
                    {post.postedBy.userName} {` `}
                    <GoVerified className="text-blue-600 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
        {!smallCard && (
            <div className='px-0 mr-1 mb-5 md:px-20'>
            <p className=' text-md text-gray-600'>{post.caption}</p>
          </div>
        )}
        
      </div>
      <div
        className={`lg:ml-20 flex gap-4 relative ${
          smallCard ? "lg:ml-1 md:ml-2" : " "
        }`}
      >
        <div
          onMouseEnter={() => {
            setisHover(true);
          }}
          onMouseLeave={() => {
            setisHover(false);
          }}
          className={`rounded-3xl `}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className={`lg:w-[400px] ${
                smallCard ? "lg:h-[300px]" : "h-[500px]"
              } md:h-[450px] lg:h-[528px] w-[280px] rounded-2xl cursor-pointer bg-gray-100 `}
              src={post.video.asset.url}
            ></video>
          </Link>
          {!hideControls && isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-10 flex gap-10  w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-[#FF4436] text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-[#FF4436] text-2xl lg:text-4xl" />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setisMuted(false)}>
                  <HiVolumeOff className="text-[#FF4436] text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setisMuted(true)}>
                  <HiVolumeUp className="text-[#FF4436] text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
