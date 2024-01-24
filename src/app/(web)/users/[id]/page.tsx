"use client";

import { getUserBookings, getUserData } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import axios from "axios";
import { User } from "@/components/models/user";

type Props = {
  params: {
    userId: string;
  };
};

const UserDetails = ({ params: { userId } }: Props) => {
  const fetchUserBooking = async () => await getUserBookings(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
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
    throw new Error(`Cannot fetch data: `, error || errorGettingUserData);
  }
  if (typeof userBookings === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");
  if (!userBookings) return <LoadingSpinner />;

  console.log("user booking ", userBookings);

  console.log("user data: " + userData);

  return (
    <div className=" flex justify-center items-center w-full h-full">
      STILL ON BUILDING PROCESS
    </div>
  );
};

export default UserDetails;
