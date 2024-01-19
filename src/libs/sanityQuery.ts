import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0]{
  _id,
  description,
  discount,
  images,
  isFeatured,
  name,
  price,
  slug,
  coverImage
}`;

// groq has no special use than just help the editor know that this is a groq query. also help for auto completion.

export const getRoomsQuery = groq`*[_type == "hotelRoom"]{
  _id,
  coverImage,
  description,
  dimension,
  isBooked,
  isFeatured,
  name,
  price,
  slug,
  type
}`;

export const getRoom = groq`*[_type == "hotelRoom" && slug.current == $slug][0]{
  _id,
  coverImage,
  description,
  dimension,
  discount,
  images,
  isBooked,
  isFeatured,
  name,
  numberOfBeds,
  offeresdAmenities,
  price,
  slug,
  specialNote,
  type
}`;
