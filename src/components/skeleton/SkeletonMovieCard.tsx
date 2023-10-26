"use client";
import React from "react";
export default function SkeletonMovieCard() {
  return (
    <React.Fragment>
      <div className="mt-5 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 animate-pulse">
      {[...new Array(18)]
            .map((index) =>  (
            <div
              key={index}
              className="flex flex-col items-center w-[200px] h-[310px] rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          ))}
      </div>
    </React.Fragment>
  );
}
