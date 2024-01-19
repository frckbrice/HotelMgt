"use client";

import Link from "next/link";
import React from "react";
import { useThemeContext } from "@/app/(web)/themeProvider/ThemeProvider";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  const { darkTheme, setDarkTheme } = useThemeContext();

  const { data: session } = useSession();

  return (
    <header className="py-10 px-4 container mx-auto flex flex-wrap md:flex-nowrap items-center justify-between">
      <div className=" flex items-center w-full md:W-2/3">
        <Link href="/" className=" font-black text-tertiary-light">
          HotelMT
        </Link>
        <ul className="flex items-center ml-5 gap-2">
          <li className="flex items-center">
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className=" w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className="scale-animation img"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="cursor-pointer" />
                )}
              </Link>
            ) : (
              <Link href="/auth">
                <FaUserCircle className="cursor-pointer" />
              </Link>
            )}
          </li>
          <li className="flex items-center">
            {darkTheme ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                onClick={() => {
                  console.log("clicked");
                  setDarkTheme(false);
                  localStorage.removeItem("hotel-theme");
                }}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer"
                onClick={() => {
                  console.log("clicked");
                  setDarkTheme(true);
                  localStorage.setItem("hotel-theme", "true");
                }}
              />
            )}
          </li>
        </ul>
      </div>
      <ul className=" flex items-center justify-evenly w-full md:W-1/3 mt-4">
        <li className=" hover:translate-y-2 duration-500 translate-all">
          <Link href="/">Home</Link>
        </li>
        <li className=" hover:translate-y-2 duration-500 translate-all">
          <Link href="/rooms">Rooms</Link>
        </li>
        <li className=" hover:translate-y-2 duration-500 translate-all">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
