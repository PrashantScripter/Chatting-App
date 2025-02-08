import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white">
      <h1 className="text-9xl font-extrabold tracking-widest text-red-500 animate-pulse">
        404
      </h1>
      <p className="text-lg mt-4 text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-md text-gray-500 mt-2">Maybe it was moved or deleted?</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-800 hover:bg-slate-900 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-md"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
