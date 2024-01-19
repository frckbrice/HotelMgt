import { Room } from "@/components/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQuery";

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
  return result;
}
