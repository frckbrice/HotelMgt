import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC } from "react";

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (roomType: string) => void;
  setSearchQuery: (searchQuery: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}: Props) => {
  const router = useRouter();

  const handleRoonTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQuerychange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className=" bg-tertiary-light px-4 py-6 rounded-lg">
      <div className=" container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black ">
            Room Type
          </label>
          <div className=" relative">
            <select
              className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none"
              onChange={handleRoonTypeChange}
              value={roomTypeFilter}
            >
              <option value="all">All</option>
              <option value="Basic">Basic</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>
        <div className=" w-full md:1/3  lg:w-auto mb-4 md:mb-0">
          <label
            htmlFor="search"
            className=" block text-sm font-medium mb-2 text-black"
          >
            Search
          </label>
          <input
            type="search"
            placeholder="Search ..."
            id="search"
            className="w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white"
            value={searchQuery}
            onChange={handleSearchQuerychange}
          />
        </div>
        <button
          className="btn-primary"
          type="button"
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
