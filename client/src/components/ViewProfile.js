import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const propTypes = {};
const defaultProps = {};

const ViewProfile = () => {
  const params = useParams();
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`https://rentify-1-oldy.onrender.com/viewprofile/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setdata1(res.data.userdetails);
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  useEffect(() => {
    axios
      .get(`https://rentify-1-oldy.onrender.com/viewposts/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => setdata2(res.data.mypost))
      .catch((err) => console.log(err));
  }, [params.id]);
  const likePost = (id) => {
    fetch("https://rentify-1-oldy.onrender.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const newData = data2.map((item) => {
          if (item._id === updated._id) {
            return updated;
          } else {
            return item;
          }
        });
        setdata2(newData);
      })
      .catch((updated) => console.log(updated));
  };
  const unlikePost = async (id) => {
    await fetch("https://rentify-1-oldy.onrender.com/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const newData = data2.map((item) => {
          if (item._id === updated._id) {
            return updated;
          } else {
            return item;
          }
        });
        setdata2(newData);
      })
      .catch((updated) => console.log(updated));
  };

  const makeComment = async (text, postId) => {
    await fetch("https://rentify-1-oldy.onrender.com/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const newData = data2.map((item) => {
          if (item._id === updated._id) {
            return updated;
          } else {
            return item;
          }
        });
        setdata2(newData);
      })
      .catch((err) => console.log(err));
  };
  const deletePost = async (postid) => {
    await fetch(`https://rentify-1-oldy.onrender.com/deletepost/${postid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(alert("Post deleted succesfully..!!"))
      .then(window.location.reload())

      .catch((updated) => console.log("updated in del post", updated));
  };
  const deleteComment = async (id, commentId) => {
    await fetch(
      `https://rentify-1-oldy.onrender.com/deletecomment/${id}/${commentId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id,
          commentId,
        }),
      }
    )
      .then((res) => res.json())
      .then((updated) => {
        const newData = data2.map((item) => {
          if (item._id === updated._id) {
            return updated;
          } else {
            return item;
          }
        });
        setdata2(newData);
      })
      .catch((updated) => console.log("updated in del comment", updated));
  };

  const localid = localStorage.getItem("_id");
  const localname = localStorage.getItem("name");
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
              to="/post"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold leading-6 text-slate-900 whitespace-no-wrap bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              POST PROPERTY ⏏︎
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-extrabold leading-6 text-slate-900 whitespace-no-wrap bg-slate-400 border border-transparent rounded-md shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              DASHBOARD
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-col mt-5 items-center sm:px-5 md:flex-row  tails-selected-element ">
        <div className="w-full md:w-1/2 m-3">
          <a href={`${data1.pic}`} className="block">
            {data1.pic ? (
              <img
                className=" w-full h-full max-h-[400px] max-w-[500px] rounded-lg  "
                src={data1.pic}
                alt="profile"
              />
            ) : (
              <img
                className=" w-full h-full max-h-[400px] max-w-[500px] rounded-lg  "
                src="https://res.cloudinary.com/dgo3xjjvb/image/upload/v1681036076/prof_m5hkia.png"
                alt="profile"
              />
            )}
          </a>
        </div>
        <div className="flex flex-col items-start justify-center w-full h-full py-6 mb-6 md:mb-0 md:w-1/2">
          <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5">
            <div className="bg-purple-500  items-center pl-2 pr-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-black inline-block">
              <span> Profile of</span>
            </div>
            <h1 className="text-4xl text-gray-300 font-bold leading-none lg:text-5xl xl:text-6xl">
              {" "}
              {data1.name} 's Profile
            </h1>
            <h1 className="text-3xl text-white underline">Contact Details :</h1>
            <p className="text-white text-1xl">
              {" "}
              <span className="underline text-gray-300">Email : </span>{" "}
              {data1.email}
            </p>
            <p className="text-white text-1xl">
              {" "}
              <span className="underline text-gray-300">Phone : </span>{" "}
              {data1.phone}
            </p>
          </div>
        </div>
      </div>

      <section className="w-full px-8 text-4xl text-gray-300 bg-black">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          Properties of - {data1.name} {data1.lastname}
        </div>
      </section>
      <div className="container p-2 bg-black mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-6">
        {data2.map((item) => {
          return (
            <>
              <div
                key={item._id}
                className="rounded-xl pl-2 overflow-scroll scrollbar-hide bg-gray-900 border-gray-700 border-2 h-[700px]"
              >
                <div className=" bg-opacity-80 text-purple-600 bg-gray-900 text-xl font-extrabold flex flex-row items-start justify-start  p-3">
                  <img
                    className="h-9 w-9  rounded-full mr-2 cursor-pointer"
                    src={`${item.pic}`}
                    alt="img"
                  />
                  {item.postedBy.name}
                  {item.postedBy._id === localid && (
                    <button onClick={() => deletePost(item._id)}>
                      <img
                        className="h-6 w-6 ml-4 cursor-pointer"
                        src="/images/del.png"
                        alt="del"
                      />
                    </button>
                  )}
                </div>

                {item.url && (
                  <div className="flex flex-row pr-2 justify-center cursor-pointer">
                    <Link to="/">
                      <img
                        className="h-full max-h-[450px] w-full max-w-[450px] rounded-lg cursor-pointer"
                        src={item.url}
                        alt="cover img"
                      />
                    </Link>
                  </div>
                )}

                <div className="text-sm font-bold p-1  rounded-lg  text-slate-400 ml-2 mr-2 mt-1 ">
                  <p className="text-white "> Address :</p>
                </div>
                <div className="text-sm font-bold p-3 border-gray-500 rounded-lg  text-slate-400  border-[1px]  ml-2 mr-2 mt-2 ">
                  <span className="underline"> Place :</span> {item.place} ,{" "}
                  {item.area}
                  <p></p> <span className="underline"> LandMarks :</span>{" "}
                  {item.quote}
                </div>

                <div className="text-sm font-bold p-1  rounded-lg  text-slate-400 ml-2 mr-2 mt-1 ">
                  <p className="text-white "> Descrption of the Property :</p>
                </div>
                <div className="text-sm font-bold p-3 border-gray-500 rounded-lg  text-slate-400  border-[1px]  ml-2 mr-2 mt-2 ">
                  <p className="text-white">Bedrooms: {item.no_of_bedrooms} </p>
                  <p className="text-white">
                    BathRooms: {item.no_of_bathrooms}{" "}
                  </p>
                </div>
                <div>
                  <div className="grid grid-cols-2  border-2 border-b-gray-900 border-t-gray-900 border-l-gray-900 border-r-gray-900 border-b-2 mt-2 mr-2   ">
                    <div className="min-h-[30px] pl-6 text-sm font-bold text-slate-400 pt-4 rounded-l-lg  bg-gray-900 ">
                      {item.createdAt.substring(0, 10)} ⎪
                      {item.createdAt.substring(11, 16)}
                    </div>
                    <div className="min-h-[30px] pl-32 bg-gray-900 rounded-r-lg ">
                      {item.likes.includes(localid) ? (
                        <button onClick={() => unlikePost(item._id)}>
                          <img
                            className="w-8 h-8 opacity-90"
                            src="/images/nl2.png"
                            alt="likes"
                          />
                        </button>
                      ) : (
                        <button
                          className="mr-2 w-10"
                          onClick={() => {
                            likePost(item._id);
                          }}
                        >
                          <img
                            className="w-10 h-8  opacity-90"
                            src="/images/nul2.png"
                            alt="likes"
                          />
                        </button>
                      )}
                      {/* <img  className="w-8 h-8 opacity-90" src="/images/likeimg.png" alt="likes" /> */}
                      <div className="pl-[12px] font-semibold text-slate-400">
                        {item.likes.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-lg pb-2 font-extrabold text-slate-300 underline">
                  Comments ({item.comments.length}) :{" "}
                </div>

                <span>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      makeComment(e.target[0].value, item._id);
                    }}
                  >
                    <div className="relative mr-[14px]">
                      <input
                        type="search"
                        id="search"
                        className=" w-[253px]  p-4 pl-3 mb-2  text-sm font-semibold text-gray-200 border border-gray-300 rounded-lg bg-gray-200 bg-transparent placeholder-slate-400   "
                        placeholder="Write a Comment..."
                      />
                      <button
                        type="submit"
                        onSubmit={(e) => {
                          e.preventDefault();
                          makeComment(e.target[0].value, item._id);
                        }}
                        className="text-gray-200 absolute right-2.5 bottom-2.5 bg-purple-600 hover:bg-purple-700   font-extrabold rounded-lg text-3xl px-4 py-1  "
                      >
                        <img
                          className="w-9 h-10"
                          src="/images/sub.png"
                          alt="Add"
                        />
                      </button>
                    </div>
                  </form>
                </span>
                {item.comments.map((record) => {
                  return (
                    <>
                      <div
                        key={record._id}
                        className="text-sm pl-2 font-extrabold text-slate-300  underline "
                      >
                        ➤ {record.postedBy.name}
                        {record.postedBy.name === localname && (
                          <button
                            className="mt-2 ml-2"
                            onClick={() => deleteComment(item._id, record._id)}
                          >
                            <img
                              className="h-5   w-5 "
                              src="/images/del.png"
                              alt="del"
                            />
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-slate-400  font-medium ml-7 ">
                        {" "}
                        {record.text}
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

ViewProfile.propTypes = propTypes;
ViewProfile.defaultProps = defaultProps;
// #endregion

export default ViewProfile;
