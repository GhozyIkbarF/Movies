"use client";
import React from "react";

export default function SkeletonDetailMovie() {
  return (
    <React.Fragment>
      <div className="relative w-full min-h-max box-border animate-pulse">
        <div
          className="w-full h-full flex flex-wrap justify-center content-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)",
          }}
        >
          <div className="w-11/12 flex justify-center items-center px-[40px] py-[30px] box-border gap-10 flex-col md:flex-row">
            <div className="relative bg-gray-200 rounded-lg dark:bg-gray-700 w-[350px] h-[450px] overflow-hidden"></div>
            <div className="w-full flex flex-wrap flex-col flex-start text-lg gap-6 animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[200px] mb-2.5"></div>
              <Genres/>
              <div className="flex gap-1 flex-col md:flex-row lg:flex-row md:gap-5 animate-pulse">
                {[...new Array(3)].map((index) => (
                  <div key={index} className="h-5 bg-gray-200 w-[60px] rounded-full dark:bg-gray-700 max-w-[60px]"></div>
                ))}
              </div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[200px] mb-2.5"></div>
              <div className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5"></div>
                <div className="bg-gray-200 h-24 rounded-lg min-w-[300px] max-w-[800px] dark:bg-gray-700"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap my-10 px-5 md:px-10">
        <div className="w-full md:w-4/5">
          <h1 className="font-bold text-4xl mb-2">Actors</h1>
          <div
            className="max-w-min flex min-h-max overflow-x-auto scrollbar-thin gap-2"
            style={{ scrollbarWidth: "initial" }}
          >
             {[...new Array(10)].map((index) =>(
                <div className="rounded-lg bg-gray-200 dark:bg-gray-700" key={index}>
                  <div className="relative w-[143px] h-[175px] rounded-t-lg"></div>
                  <div className="p-1 w-[143px] animate-pulse">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[80px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[80px] mb-2.5"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col-reverse mt-5 md:flex-col md:mt-0 md:pl-10 md:w-1/5">
          <div className="flex text-xl pt-5 gap-3 mb-5 md:text-3xl md:pt-2 animate-pulse">
          {[...new Array(3)].map((index) =>(
            <div key={index} className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-10"></div>
        ))}
          </div>
          <div className="flex flex-wrap gap-4 md:flex-col md:gap-3">
            {[...new Array(4)].map((index) =>(
            <div className="" key={index}>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[70px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[90px] mb-2.5"></div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const Genres = () => {
  return (
    <div className="flex gap-2 md:gap-4">
        {[...new Array(3)].map((index) =>(
          <div key={index} className="h-5 bg-gray-200 w-[60px] rounded-full dark:bg-gray-700 max-w-[60px]"></div>
        ))}
    </div>
  );
};
