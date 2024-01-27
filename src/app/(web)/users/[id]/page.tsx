"use client";

import { getUserBookings, getUserData } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import axios from "axios";
import { User } from "@/components/models/user";
import { Booking } from "@/components/models/booking";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

type Props = {
  params: {
    id: string;
  };

  FetchBooking: () => Promise<Booking[]>;
};

const UserDetails = ({ params: { id: userId }, FetchBooking }: Props) => {
  // console.log("userId: " + userId);

  const fetchUserBooking: typeof FetchBooking = async () =>
    await getUserBookings(userId);

  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    // const resp = await fetch("/api/users");
    // if (resp.ok) return await resp.json();
    return data;
  };

  const {
    data: userData,
    error: errorGettingUserData,
    isLoading: loadingUserData,
  } = useSWR("/api/users", fetchUserData);

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userbooking", fetchUserBooking);

  if (error || errorGettingUserData) {
    console.log("error: " + error);
    console.log("errorGettingUserData: " + errorGettingUserData);
    throw new Error(`Cannot fetch data: `, error || errorGettingUserData);
  }

  if ((typeof userBookings === "undefined" && !isLoading) || !userData)
    throw new Error("Cannot fetch data");
  if (isLoading || loadingUserData) return <LoadingSpinner />;

  return (
    <div className=" container mx-auto px-2 md:px-4 py-10">
      <div className=" grid grid-cols-12 gap-10">
        <div className=" hidden md:block col-span-4 lg:col-span-3 shadow-lg h-fit sticky to-10 ng-[#efff04]">
          <div className=" md:w-[143px] w-30 h-28 md:h[143px] mx-auto mb-5 rounded-full overflow-hidden">
            <Image
              src={userData.image ?? ""}
              alt={userData.name}
              width={143}
              height={143}
              className=" img scale-animation rounded-full"
            />
          </div>
          <div className=" font-normal py-4 text-left">
            <h6 className=" text-xl font-bold pb-3">About</h6>
            <p className=" text-sm ">{userData.about ?? ""}</p>
          </div>
          <div className=" font-normal text-left">
            <h6 className="text-xl font-bold pb-3">{userData.name}</h6>
          </div>
          <div className=" flex items-center">
            <p className=" mr-4"> Sign Out</p>
            <FaSignOutAlt
              size={30}
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
        </div>

        <div className=" md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3"> Hello, {userData.name}</h5>
          </div>
          <div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden ">
            <Image
              src="/images/alexander.jpg"
              alt="User name"
              width={56}
              height={56}
              className=" img scale-animation rounded-full"
            />
          </div>
          <p className=" block w-fit md:hidden text-sm py-2">
            {userData.about ?? ""}
          </p>
          <p className=" text-xs py-2"></p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
