import { CreateBooingDto, Room } from "@/components/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQuery";
import axios from "axios";
import hotelRoom from "../../schemas/hotelRoom";
import { Booking } from "@/components/models/booking";

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: "no-cache" }
    // { next: { revalidate: 1800 } } // usefull in production
  );

  return result;
}

export const getRooms = async (): Promise<Room[]> => {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
};

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" }
  );
  // console.log("room from api file: ", result);
  return result;
}

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBooingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user }, // foreign key
          hotelRoom: { _type: "reference", _ref: hotelRoom }, //foreign key
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const updateHotelRoom = async (hotelRoomId: string) => {
  const mutation = {
    mutations: [
      {
        patch: [
          {
            id: hotelRoomId,
            set: {
              isBooked: true,
            },
          },
        ],
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const getUserBookings = async (userId: string) => {
  const result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    {
      userId,
    },
    { cache: "no-cache" }
  );

  return result;
};

export const getUserData = async (userId: string) => {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    {
      cache: "no-cache",
    }
  );

  return result;
};
