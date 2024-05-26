import React from "react";
import { Link } from "react-router-dom";

const propTypes = {};
const defaultProps = {};
const Navbar1 = () => {
  const localid = localStorage.getItem("_id");

  return (
    <>
      <section className="w-full px-8 text-gray-700 bg-gray-900">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link
              to="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto mr-[2px]  text-[30px] font-black leading-none text-gray-400  select-none">
                Rentify🏘️
              </span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              <Link
                to={`/profile/${localid}`}
                className="mr-5  font-bold leading-6 text-purple-600 hover:text-purple-500"
              >
                My Profile
              </Link>
            </nav>
          </div>

          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold leading-6 text-slate-900 whitespace-no-wrap bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

Navbar1.propTypes = propTypes;
Navbar1.defaultProps = defaultProps;
// #endregion

export default Navbar1;
