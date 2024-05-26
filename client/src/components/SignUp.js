import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const propTypes = {};
const defaultProps = {};
const SignUp = () => {
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setauth] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = () => {
    if (!name || !lastname || !email || !phone || !password) {
      alert("Please fill all the fields..");
      return;
    }
    if (phone.length < 10) {
      alert("Invalid Phone Number..");
      return;
    }
    let user = {
      name: name,
      lastname: lastname,
      email: email,
      phone: phone,
      password: password,
    };
    setloading(true);
    //eslint-disable-next-line
    if (
      !/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      alert("Invalid Email..");
      setloading(false);
      return;
    }
    axios
      .post("https://rentify-1-oldy.onrender.com/signup", user)
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("_id", res.data._id);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("lastname", res.data.lastname);
        localStorage.setItem("phone", res.data.phone);
        localStorage.setItem("pic", res.data.pic);
        setloading(false);
        setauth(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setloading(false);
      });
  };
  //err.response.data.message
  if (auth) {
    return <Navigate to="/" />;
  }
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
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200"></nav>
          </div>

          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link
              to="/signin"
              className="inline-flex items-center justify-center mr-2 px-4 py-2 text-base font-semibold leading-6 text-slate-900 whitespace-no-wrap bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full px-8 lg:mt-10 md:mt-10 py-16 bg-black xl:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            <div className="w-full space-y-5 md:w-3/5 md:pr-16">
              <h2 className="text-2xl font-extrabold leading-none text-purple-600 hover:text-purple-500 sm:text-3xl md:text-5xl">
                Find your dream Property now on - Rentify 🏘️
              </h2>
            
            </div>

            <div className="w-full mt-16 md:mt-0 md:w-2/5">
              <div
                className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-gray-800 border-b-2 border-gray-800 rounded-lg shadow-2xl px-7"
                data-rounded="rounded-lg"
                data-rounded-max="rounded-full"
              >
                <h3 className="mb-6  text-2xl font-bold text-gray-300 text-center">
                  Sign Up..!!
                </h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400 rounded-lg focus:ring text-white placeholder:text-gray-300 focus:ring-gray-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400 rounded-lg focus:ring text-white placeholder:text-gray-300 focus:ring-gray-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="LastName"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400  rounded-lg text-white placeholder:text-gray-300 focus:ring-gray-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Email address"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400 rounded-lg focus:ring text-white placeholder:text-gray-300 focus:ring-gray-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Phone"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400  rounded-lg text-white placeholder:text-gray-300 focus:ring-purple-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Password"
                />
                <div className="block">
                  {loading ? (
                    <button
                      disabled
                      type="button"
                      className=" text-black bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-6 w-40 inline-flex items-center"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-8 h-9 mr-3 text-black animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button
                      className="w-full px-3 py-4  text-black font-bold bg-purple-600 hover:bg-purple-700 rounded-lg"
                      data-primary="blue-600"
                      data-rounded="rounded-lg"
                      onClick={handleSubmit}
                    >
                      Sign Up
                    </button>
                  )}
                </div>
                <p className="w-full mt-4 text-sm text-center text-gray-500">
                  Have an Account .??{" "}
                  <Link to="/signin" className="text-purple-500 underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;
// #endregion

export default SignUp;
