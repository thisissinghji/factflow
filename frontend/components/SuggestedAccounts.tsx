import React, { useEffect } from "react";
import Image from "next/image";
import { NextPage } from "next";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested accounts
      </p>
      <div>
        {allUsers?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
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
              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-semibold text-primary lowercase">
                  {user.userName .replaceAll(" ", "")}<GoVerified className='text-blue-600 text-md'/>
                </p>
                <p className='capitalize font-medium text-xs text-gray-400 hidden md:block'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
