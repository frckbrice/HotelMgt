import sanityClient from "@/libs/sanity";
import { signUpHandler } from "next-auth-sanity";
import { SanityClient } from "sanity";

export const POST = signUpHandler(sanityClient as SanityClient);
