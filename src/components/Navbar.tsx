"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FiSearch } from "react-icons/fi";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const [show, setShow] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const isMobile = window.matchMedia(
          "(min-width: 300px) and (max-width: 768px)"
        );
        if (isMobile) {
          setShow(false);
        }
      };
      // Attach the event listener when the component mounts
      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => { setIsScrollingUp(false) }, []);

    useEffect(() => {
        // Check if we are on the client side
        if (typeof window !== 'undefined') {
          const handleScroll = () => {
            const position = window.scrollY;
    
            if (position < 20) {
              setIsScrollingUp(false);
            } else if (position < currentPosition) {
              setIsScrollingUp(true);
            } else {
              setShow(false)
              setIsScrollingUp(false);
            }
            setCurrentPosition(position);
          };
    
          // Attach the scroll event listener when the component mounts
          window.addEventListener('scroll', handleScroll);
    
          // Remove the scroll event listener when the component unmounts
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }
      }, [currentPosition]);

  return (
    <nav className={`fixed flex flex-col w-full justify-between transition-all z-50 md:justify-around pl-5 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 ${isScrollingUp || currentPosition < 68 ? 'top-0' : 'top-[-100px]'}`}>
      <div className="flex justify-between lg:justify-around items-center flex-shrink-0 text-white mr-6">
        <Link href={"/"} className="font-semibold text-xl tracking-tight">
          Movie App
        </Link>
        <Menu className={`hidden lg:flex`} />
        <div className="relative text-gray-600 hidden lg:block">
          <button
            type="submit"
            className="text-2xl text-white"
            onClick={() => setSearch((prev) => !prev)}
          >
            <FiSearch />
          </button>
        </div>
        <div className="block lg:hidden">
          <button
            type="button"
            className="flex items-center px-3 py-2 text-gray-20 text-2xl hover:text-white"
            onClick={() => setShow((prev) => !prev)}
          >
            <FaBars />
          </button>
        </div>
      </div>
      <Menu
        className={`${
          show ? "min-h-max" : "h-0"
        } lg:hidden lg:items-center lg:w-auto transition-all overflow-hidden`}
      />
      {search && (
        <div className="absolute flex justify-center -bottom-11 right-0 left-0">
          <div className="w-1/2 hidden lg:flex relative text-gray-600 pr-5">
            <input
              type="search"
              name="search"
              placeholder="Search movie..."
              className="w-full bg-white h-10 px-5 pr-10 text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-5 top-0 mt-3 mr-4">
              <FiSearch />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

const Menu = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <div className="text-md lg:flex-grow">
        <NavLink/>
      </div>
      <div className="flex lg:hidden items-center mt-5">
        <div className="w-full relative text-gray-600 pr-5">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="w-full bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          />
          <button type="submit" className="absolute right-5 top-0 mt-3 mr-4">
            <FiSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

const NavLink = () => {
  const listLink = [
    {
      href: '/movie',
      title: 'Popular'
    },
    {
      href: '/movie/top-rated',
      title: 'Top Rated'
    },
    {
      href: '/movie/now-playing',
      title: 'Now Playing'
    },
    {
      href: '/movie/upcoming',
      title: 'Up Comming'
    },
  ]
  return (
    <React.Fragment>
      {listLink?.map((link, index) => (
        <Link
            href={link.href}
            key={index}
            // onClick={() => }
            className={`block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white ${index == listLink.length -1 ? 'mr-0' : 'mr-5'} `}
          >
            {link.title}
          </Link>
      ))}
    </React.Fragment>
  )
}


