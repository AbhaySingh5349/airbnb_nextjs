'use client';

import React from 'react';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const Search = () => {
  return (
    <div className="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto">
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">Anywhere</div>
        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          Any Week
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          Add Guest
        </div>
        <div className="mr-2 rounded-full bg-rose-500 p-2 text-white">
          <MagnifyingGlassIcon className=" h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Search;
