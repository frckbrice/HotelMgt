import Link from "next/link";
import React from "react";
import { BsFillSendFill } from "react-icons/bs";
import { BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-16">
      <div className=" container mx-auto px-4">
        <Link href="/" className="font-black text-tertiary-dark">
          HotelMT
        </Link>
        <h4 className="font-semibold text-[40px] py-6">Contact</h4>
        <div className=" flex flex-wrap gap-16 items-center justify-between">
          <div className="flex-1">
            <p>123 Road</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">Avom</p>
            </div>
            <div className="flex items-center py-4">
              <BsTelephoneOutbound />
              <p className="ml-2">674-852-304</p>
            </div>
            <div className="flex items-center py-4">
              <BiMessageDetail />
              <p className="ml-2"> CodewithUs</p>
            </div>
          </div>
          <div className="flex-1 md:text-right">
            <p className="pb-4">Our story</p>
            <p className="pb-4">Get in touch</p>
            <p className="pb-4">Our privacy commitment</p>
            <p className="pb-4">Terms of service</p>
            <p>Coustomer Assistance</p>
          </div>
          <div className="flex-1 md:text-right">
            <p className="pb-4">Dining Experience</p>
            <p className="pb-4">Wellness</p>
            <p className="pb-4">Fitness</p>
            <p className="pb-4">Sports</p>
            <p>Events</p>
          </div>
        </div>
      </div>
      <div className=" bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0" />
    </footer>
  );
};

export default Footer;
