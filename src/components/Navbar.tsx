// src/components/Navbar.tsx

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-green-700 py-3 px-7 shadow-md">
      {/* Main container with justify-between to push items to ends */}
      <div className="container mx-auto flex justify-between items-center">
        {/* LEFT Section: Logo Icon and App Name (Text) */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo/logo.png"
            alt="Littlebooker Logo Icon"
            width={100}
            height={100}
          />
          <span className="text-white text-3xl font-bold tracking-wide">
            Little
            <span className="text-yellow-300">booker</span>
          </span>
        </Link>

        {/* MIDDLE-LEFT Section: Search Bar (more controlled width) */}
        {/* Removed flex-grow and added a fixed width for better control */}
        <div className="ml-10"> {/* ml-10 adds space between logo and search */}
          <input
            type="text"
            placeholder="Search events, plays, sports..."
            className="w-80 p-2 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Search events"
          />
        </div>

        {/* RIGHT Section: Navigation Links and Login/Signup Button */}
        {/* Kept space-x-6, but consider increasing if items are too close to search */}
        <div className="flex items-center space-x-6">
          {/* Group for the main Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-white hover:text-yellow-300 text-lg transition-colors duration-200"
            >
              Events
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-yellow-300 text-lg transition-colors duration-200"
            >
              Plays
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-yellow-300 text-lg transition-colors duration-200"
            >
              Sports
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-yellow-300 text-lg transition-colors duration-200"
            >
              Activities
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-yellow-300 text-lg transition-colors duration-200"
            >
              About Us
            </Link>
          </div>

          {/* Login/Sign Up Button */}
          <Link
            href="/auth"
            className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-semibold py-2 px-5 rounded-full shadow-md transition duration-300 transform hover:scale-105 text-base"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}