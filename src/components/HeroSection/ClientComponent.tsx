"use client";
import React, { FC } from "react";
import CountUpNumber from "../CountUpCounter/CountupNumber";

type Props = {
  heading1: React.ReactNode;
  section2: React.ReactNode;
};

const ClientComponent: FC<Props> = (props) => {
  const { heading1, section2 } = props;
  return (
    <section className=" flex px-4 items-center gap-12 container mx-auto">
      <div className="py-10 h-full">
        {heading1}

        {/* Room description */}
        <div className=" flex justify-between mt-12">
          <div className=" flex gap-3 flex-col items-center justify-center">
            <p className=" text-xs lg:text-xl text-center">Basic Room</p>
            <CountUpNumber durations={3000} endValue={100} />
          </div>
          <div className=" flex gap-3 flex-col items-center justify-center">
            <p className=" text-xs lg:text-xl text-center">Luxury Room</p>
            <CountUpNumber durations={3000} endValue={10} />
          </div>
          <div className=" flex gap-3 flex-col items-center justify-center">
            <p className=" text-xs lg:text-xl text-center">Suite</p>
            <CountUpNumber durations={5000} endValue={40} />
          </div>
        </div>
      </div>
      {/*The avantage here is image load fast than in the client components*/}
      {section2}
    </section>
  );
};

export default ClientComponent;
