import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResult";
import { IUser } from "../types";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}
interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}
const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[50px]">
      <div className="overflow-scroll lg:h-[457px]">
      {comments?.length ? (
          comments.map((item) => {
            // Find the user corresponding to the comment
            const user:IUser = allUsers.find((user) => user._id === (item.postedBy._id || item.postedBy._ref));

            // Check if a user is found
            if (user) {
              return (
                <div className=" mb-2 p-2 items-center bg-gray-200 rounded-lg" key={item._key}>
                  <Link href={`/profile/${user._id}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8">
                        <Image
                          width={34}
                          height={34}
                          className="rounded-full"
                          src={user.image}
                          alt="user-profile"
                          layout="responsive"
                        />
                      </div>
                      <div className="md:block">
                        <p className="flex gap-1 items-center text-md font-semibold text-primary lowercase">
                          {user.userName.replaceAll(" ", "")}
                          <GoVerified className="text-blue-600 text-md" />
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <p className="mt-1 ml-12 text-[16px] mr-8">{item.comment}</p>
                  </div>
                </div>
              );
            }
            return null; // Skip rendering if no matching user is found
          })
        ) : (
          <NoResults text="Be the first to comment" />
        )}
      </div>
      {userProfile && (
        <div>
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400 " onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
