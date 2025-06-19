// src/app/page.tsx

import Link from "next/link";
import Navbar from "../components/Navbar"; // Assuming Navbar is in components

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-100 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-green-800 mb-6 drop-shadow-lg">
          Welcome to Littlebooker!
        </h1>
        <h2 className="text-3xl font-semibold text-green-700 mb-10">
          Your Adventure Awaits!
        </h2>

        <div className="relative w-full max-w-2xl mx-auto mb-12">
          {/* Example: A central image for the theme */}
          <img
            src="/images/panda-jungle.png" // You'll need to add an image like this
            alt="Panda in the Jungle"
            className="w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
          <p className="absolute bottom-4 left-4 right-4 text-white text-lg bg-black bg-opacity-50 p-2 rounded">
            Explore exciting events for kids aged 5-15!
          </p>
        </div>

        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Roam through our jungle of fun and discover the best events, shows,
          and workshops specially designed for little adventurers and their
          panda pals!
        </p>

        <div className="space-x-4">
          <Link
            href="/dashboard"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Explore Events
          </Link>
          <Link
            href="/auth"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Login / Sign Up
          </Link>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-600 bg-green-200 mt-12">
        <p>&copy; {new Date().getFullYear()} Littlebooker. All rights reserved.</p>
        <p>A fun adventure for every child!</p>
      </footer>
    </div>
  );
}