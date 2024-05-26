import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Navbar1 from "./Navbar1";

const propTypes = {};
const defaultProps = {};
const Post = () => {
  // const randomnumber = (Math.random() * 10).toFixed(0);
  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";
  const [url1, seturl1] = useState("");
  const [place, setplace] = useState("");
  const [area, setarea] = useState("");
  const [no_of_bedrooms, setno_of_bedrooms] = useState("");
  const [no_of_bathrooms, setno_of_bathrooms] = useState("");
  const [quote, setquote] = useState("");
  const [imagename, setimagename] = useState("DROP YOUR IMAGE");
  const [auth, setauth] = useState(false);
  const [loading, setloading] = useState(false);
  const localpic = localStorage.getItem("pic");
  const getValue_bedRooms = () => {
    var selectedvalue = document.getElementById("mySelect").value;
    setno_of_bedrooms(selectedvalue);
  };
  const getValue_bathrooms = () => {
    var selectedvalue = document.getElementById("mySelect2").value;
    setno_of_bathrooms(selectedvalue);
  };
  const handlefile = async (e) => {
    setloading(true);
    const file = e.target.files[0];
    setimagename(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => {
        seturl1(res.data.secure_url);
        setloading(false);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    let post = {
      url: url1,
      pic: localpic,
      place: place,
      area: area,
      no_of_bedrooms: no_of_bedrooms,
      no_of_bathrooms: no_of_bathrooms,
      quote: quote,
    };
    const token = "Bearer " + localStorage.getItem("jwt");
    await axios
      .post("https://rentify-1-oldy.onrender.com/createpost", post, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        alert("Posted Successfully");
        setauth(true);
      })
      .catch((err) => alert(err.response.data.message));
  };

  if (auth) {
    return <Navigate to="/" />;
  }
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <Navbar1 />
      <section className="w-full px-8 lg:mt-5 md:mt-5 py-16 xl:px-8 ">
        <div className="max-w-7xl md:ml-48 ">
          <div className="flex flex-col  md:flex-row">
            <div className="w-full mt-16 md:mt-0 md:ml-5 lg:ml-60 md:w-2/5">
              <div
                className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-gray-800   rounded-lg shadow-2xl px-7"
                data-rounded="rounded-lg"
                data-rounded-max="rounded-full"
              >
                <h3 className="mb-6  text-2xl font-medium text-center text-gray-300">
                  Enter Details of your Property..!!
                </h3>
                <div className="relative">
                  <label className="font-medium text-gray-400 ">
                    Upload Property Image..! (optional)
                  </label>
                  <div className="extraOutline p-4  bg-gray-700 w-max bg-whtie mt-4 rounded-lg ">
                    <div className="file_upload p-5 relative border-4 border-dotted border-gray-500 rounded-lg">
                      <svg
                        className="text-purple-600 w-24 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="input_field flex flex-col w-max mx-auto text-center">
                        <label>
                          <input
                            className="text-sm cursor-pointer w-36 hidden"
                            type="file"
                            name="file"
                            onChange={handlefile}
                          />
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
                              Uploading.....
                            </button>
                          ) : (
                            <div className="text bg-purple-600 text-gray-800 border border-gray-800 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-purple-500">
                              Upload
                            </div>
                          )}
                        </label>

                        <div className="title text-purple-600 uppercase">
                          {imagename}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-medium text-gray-400 mt-2">
                  Place <span className="text-xl text-purple-600 "> * </span>
                </p>
                <input
                  type="text"
                  value={place}
                  className="block w-full px-4 mt-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-slate-500 bg-gray-600 text-gray-200 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Ex: Hyderabad .."
                  onChange={(e) => setplace(e.target.value)}
                />
                <p className="font-medium text-gray-400 mt-2">
                  Area <span className="text-xl text-purple-600 "> * </span>
                </p>
                <input
                  type="text"
                  value={area}
                  className="block w-full px-4 mt-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-slate-500 bg-gray-600 text-gray-200 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Ex: Hitech City .."
                  onChange={(e) => setarea(e.target.value)}
                />
                {/* <p className="font-medium text-gray-400 mt-2">
                  No of BedrRooms{" "}
                  <span className="text-xl text-purple-600 "> * </span>
                </p>
                <input
                  type="text"
                  value={no_of_bedrooms}
                  className="block w-full px-4 mt-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-slate-500 bg-gray-600 text-gray-200 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Bedrroms.."
                  onChange={(e) => setno_of_bedrooms(e.target.value)}
                /> */}

                <p className="font-medium text-gray-400 mt-2 mb-2">
                  Number of Bedrooms{" "}
                  <span className="text-xl text-purple-600 "> * </span>
                </p>
                <select
                  id="mySelect"
                  className=" text-gray-300 w-44 h-10 bg-gray-600 rounded"
                  onChange={getValue_bedRooms}
                >
                  <option value="">BedRooms</option>

                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
                <p className="font-medium text-gray-400 mt-2 mb-2">
                  Number of BathRooms{" "}
                  <span className="text-xl text-purple-600 "> * </span>
                </p>
                <select
                  id="mySelect2"
                  className=" text-gray-300 w-44 h-10 bg-gray-600 rounded"
                  onChange={getValue_bathrooms}
                >
                  <option value="">BathRooms</option>

                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
                {/* <p className="font-medium text-gray-400 mt-2">
                  No of BathRooms{" "}
                  <span className="text-xl text-purple-600 "> * </span>
                </p>
                <input
                  type="text"
                  value={no_of_bathrooms}
                  className="block w-full px-4 mt-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-slate-500 bg-gray-600 text-gray-200 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="bathrooms.."
                  onChange={(e) => setno_of_bathrooms(e.target.value)}
                /> */}
                <p className="font-medium text-gray-400 mt-2">
                  LandMarks Near Area :{" "}
                  <span className="text-xl text-purple-600 "> * </span>
                </p>
                <textarea
                  type="text"
                  value={quote}
                  className="block w-full px-4 mt-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-slate-500 bg-gray-600 text-gray-200 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Ex : Near XX Hospital.."
                  onChange={(e) => setquote(e.target.value)}
                />
                <div className="block">
                  <button
                    className="w-full px-3 py-4 font-bold text-gray-800 bg-purple-600 hover:bg-purple-500 rounded-lg"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;
// #endregion

export default Post;
