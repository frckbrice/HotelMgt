"use client";

import { getUserBookings } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../loading";

type Props = {
  params: {
    userId: string;
  };
};

const UserDetails = ({ params: { userId } }: Props) => {
  const fetchUserBooking = async () => getUserBookings(userId);

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userbooking", fetchUserBooking);

  if (error) throw new Error("Cannot fetch data");
  if (typeof userBookings === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");
  if (!userBookings) return <LoadingSpinner />;

  console.log(userBookings);

  return <div>page</div>;
};

export default UserDetails;
