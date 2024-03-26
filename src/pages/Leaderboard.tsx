import { useEffect, useMemo, useRef, useState } from "react";
import { PictureGetResponse } from "../model/pic_get_res";
import { Service } from "../services/Service";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

function LeaderboardPage() {
  const service = useMemo(() => {
    return new Service();
  }, []);
  const [loading, setLoading] = useState(true);
  const pics = useRef<PictureGetResponse[]>([]);
  const picsDayAgo = useRef<PictureGetResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        let res = await service.getAllPic();
        pics.current = res;
        res = await service.getPicRankDayAgo();
        picsDayAgo.current = res;

        // const num = pics.current.indexOf(pics.current[3])
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate, service]);
  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="h-max w-full flex justify-center items-center">
          <div className="w-3/5 h-full flex flex-col justify-center items-center ">
            <div className="text-5xl text-black mt-24 mb-5 prompt-regular font-bold">
              Leaderboard
            </div>
            <div className="grid grid-cols-12 gap-4 text-white">
              {pics.current ? (
                <>
                  <div className="col-span-full flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center bg-amber-400 px-2 pt-2 py-1 rounded-md">
                      <div className="overflow-hidden rounded-t-md">
                        <img
                          className="rounded-t-md h-[200px] w-[200px] object-cover cursor-pointer transition duration-300 hover:scale-110"
                          src={pics.current[0].img}
                          style={{ maxHeight: "200px" }}
                          onClick={() => {
                            navigate("/chart/" + pics.current[0].pid);
                          }}
                        />
                      </div>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/toonmash-db-img.appspot.com/o/files%2F1.png?alt=media&token=ac68836e-4fa3-46c2-b345-d81e4b8df8b7"
                        className="rank1"
                        style={{
                          height: "60px",
                        }}
                      />
                      <div className="w-full ps-5 flex justify-between items-end font-bold prompt-regular">
                        <div className="fxcenter gap-1 pt-1">
                          {picsDayAgo.current.findIndex(
                            (p) => p.pid === pics.current[0].pid
                          ) >= 0 ? (
                            <>
                              {picsDayAgo.current.findIndex(
                                (p) => p.pid === pics.current[0].pid
                              ) > 0 ? (
                                <div className="text-green-600 fxcenter gap-1">
                                  <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[0].pid
                                    )
                                  )}
                                </div>
                              ) : picsDayAgo.current.findIndex(
                                  (p) => p.pid === pics.current[0].pid
                                ) < 0 ? (
                                <div className="text-red-600 fxcenter gap-1">
                                  <div className="bg-red-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[0].pid
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-500 fxcenter gap-1">
                                  <div className="bg-gray-500 text-white w-5 h-5 fxcenter rounded-lg">
                                    <HorizontalRuleIcon sx={{ fontSize: 20 }} />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-green-600 fxcenter gap-1">
                              <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                              </div>
                              {pics.current.length}
                            </div>
                          )}
                          <div
                            className="cursor-pointer hover:text-violet-600 transition"
                            onClick={() => {
                              navigate("/profile/" + pics.current[0].user_id);
                            }}
                          >
                            {pics.current[0].name}
                          </div>
                        </div>
                        <div>{pics.current[0].totalScore}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-6 lg:col-span-4 flex flex-col justify-center items-center">
                    <div className="h-full flex flex-col justify-center items-center bg-blue-700 px-2 pt-2 py-1 rounded-md">
                      <div className="overflow-hidden rounded-t-md">
                        <img
                          className="rounded-t-md h-[180px] w-[180px] object-cover cursor-pointer transition duration-300 hover:scale-110"
                          src={pics.current[1].img}
                          style={{ maxHeight: "180px", maxWidth: "180px" }}
                          onClick={() => {
                            navigate("/chart/" + pics.current[1].pid);
                          }}
                        />
                      </div>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/toonmash-db-img.appspot.com/o/files%2F2.png?alt=media&token=6937be74-c1de-49e9-af66-6a58fd14efed"
                        className="rank"
                        style={{
                          height: "50px",
                        }}
                      />
                      <div className="w-full ps-5 flex justify-between items-end font-bold prompt-regular">
                        <div className="fxcenter gap-1">
                          {picsDayAgo.current.findIndex(
                            (p) => p.pid === pics.current[1].pid
                          ) >= 0 ? (
                            <>
                              {picsDayAgo.current.findIndex(
                                (p) => p.pid === pics.current[1].pid
                              ) > 1 ? (
                                <div className="text-green-600 fxcenter gap-1">
                                  <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[1].pid
                                    ) - 1
                                  )}
                                </div>
                              ) : picsDayAgo.current.findIndex(
                                  (p) => p.pid === pics.current[1].pid
                                ) < 1 ? (
                                <div className="text-red-600 fxcenter gap-1">
                                  <div className="bg-red-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[1].pid
                                    ) - 1
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-500 fxcenter gap-1">
                                  <div className="bg-gray-500 text-white w-5 h-5 fxcenter rounded-lg">
                                    <HorizontalRuleIcon sx={{ fontSize: 20 }} />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-green-600 fxcenter gap-1">
                              <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                              </div>
                              {pics.current.length - 1}
                            </div>
                          )}
                          <div
                            className="cursor-pointer hover:text-violet-600 transition"
                            onClick={() => {
                              navigate("/profile/" + pics.current[1].user_id);
                            }}
                          >
                            {pics.current[1].name}
                          </div>
                        </div>
                        <div>{pics.current[1].totalScore}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-6 lg:col-span-4 flex flex-col justify-center items-center">
                    <div className="h-full flex flex-col justify-center items-center bg-amber-700 px-2 pt-2 py-1 rounded-md">
                      <div className="overflow-hidden rounded-t-md">
                        <img
                          className="rounded-t-md h-[180px] w-[180px] object-cover md:w-96 cursor-pointer transition duration-300 hover:scale-110"
                          src={pics.current[2].img}
                          style={{
                            maxHeight: "180px",
                            maxWidth: "180px",
                            objectFit: "cover",
                          }}
                          onClick={() => {
                            navigate("/chart/" + pics.current[2].pid);
                          }}
                        />
                      </div>

                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/toonmash-db-img.appspot.com/o/files%2F3.png?alt=media&token=1f15abb1-e02c-4d69-9d59-e14d2067577f"
                        className="rank"
                        style={{
                          height: "50px",
                        }}
                      />
                      <div className="w-full ps-5 flex justify-between items-end font-bold prompt-regular">
                        <div className="fxcenter gap-1">
                        {picsDayAgo.current.findIndex(
                            (p) => p.pid === pics.current[2].pid
                          ) >= 0 ? (
                            <>
                              {picsDayAgo.current.findIndex(
                                (p) => p.pid === pics.current[2].pid
                              ) > 2 ? (
                                <div className="text-green-600 fxcenter gap-1">
                                  <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[2].pid
                                    ) - 2
                                  )}
                                </div>
                              ) : picsDayAgo.current.findIndex(
                                  (p) => p.pid === pics.current[2].pid
                                ) < 2 ? (
                                <div className="text-red-600 fxcenter gap-1">
                                  <div className="bg-red-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[2].pid
                                    ) - 2
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-500 fxcenter gap-1">
                                  <div className="bg-gray-500 text-white w-5 h-5 fxcenter rounded-lg">
                                    <HorizontalRuleIcon sx={{ fontSize: 20 }} />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-green-600 fxcenter gap-1">
                              <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                              </div>
                              {pics.current.length - 2}
                            </div>
                          )}
                          <div
                            className="cursor-pointer hover:text-violet-600 transition"
                            onClick={() => {
                              navigate("/profile/" + pics.current[2].user_id);
                            }}
                          >
                            {pics.current[2].name}
                          </div>
                        </div>
                        <div>{pics.current[2].totalScore}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-6 lg:col-span-4 flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center bg-black px-2 pt-2 py-1 rounded-md object-cover">
                      <div className="overflow-hidden rounded-t-md">
                        <img
                          className="rounded-t-md w-36 h-36 xl:w-44 xl:h-44 object-cover cursor-pointer transition duration-300 hover:scale-110"
                          src={pics.current[3].img}
                          onClick={() => {
                            navigate("/chart/" + pics.current[3].pid);
                          }}
                        />
                      </div>

                      <div className="w-full flex justify-between items-end font-bold prompt-regular">
                        <div className="fxcenter gap-1">
                        {picsDayAgo.current.findIndex(
                            (p) => p.pid === pics.current[3].pid
                          ) >= 0 ? (
                            <>
                              {picsDayAgo.current.findIndex(
                                (p) => p.pid === pics.current[3].pid
                              ) > 3 ? (
                                <div className="text-green-600 fxcenter gap-1">
                                  <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[3].pid
                                    ) - 3
                                  )}
                                </div>
                              ) : picsDayAgo.current.findIndex(
                                  (p) => p.pid === pics.current[3].pid
                                ) < 3 ? (
                                <div className="text-red-600 fxcenter gap-1">
                                  <div className="bg-red-600 text-white w-5 h-5 fxcenter rounded-lg">
                                    <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pics.current[3].pid
                                    ) - 3
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-500 fxcenter gap-1">
                                  <div className="bg-gray-500 text-white w-5 h-5 fxcenter rounded-lg">
                                    <HorizontalRuleIcon sx={{ fontSize: 20 }} />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-green-600 fxcenter gap-1">
                              <div className="bg-green-600 text-white w-5 h-5 fxcenter rounded-lg">
                                <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                              </div>
                              {pics.current.length - 3}
                            </div>
                          )}
                          <div
                            className="cursor-pointer hover:text-violet-600 transition"
                            onClick={() => {
                              navigate("/profile/" + pics.current[3].user_id);
                            }}
                          >
                            {pics.current[3].name}
                          </div>
                        </div>
                        <div>{pics.current[3].totalScore}</div>
                      </div>
                    </div>
                  </div>

                  {pics.current.slice(4, 10).map((pic) => (
                    <div
                      key={pic.pid}
                      className="col-span-full md:col-span-6 lg:col-span-4 xl:col-span-2 flex justify-center items-center mb-3"
                    >
                      <div className="flex flex-col justify-center items-center bg-black px-2 pt-2 py-1 rounded-md">
                        <div className="overflow-hidden rounded-t-md">
                          <img
                            className="rounded-t-md w-36 h-36 xl:w-32 xl:h-32 object-cover cursor-pointer transition duration-300 hover:scale-110"
                            src={pic.img}
                            style={{
                              maxHeight: "150px",
                              minWidth: "100px",
                            }}
                            onClick={() => {
                              navigate("/chart/" + pic.pid);
                            }}
                          />
                        </div>

                        <div className="w-full flex justify-between items-end lg:text-sm font-bold prompt-regular">
                          <div className="fxcenter gap-1">

                          {picsDayAgo.current.findIndex(
                            (p) => p.pid === pic.pid
                          ) >= 0 ? (
                            <>
                              {picsDayAgo.current.findIndex(
                                (p) => p.pid === pic.pid
                              ) > pics.current.indexOf(pic) ? (
                                <div className="text-green-600 fxcenter gap-1">
                                  <div className="bg-green-600 text-white w-4 h-4 fxcenter rounded-md">
                                    <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pic.pid
                                    ) - pics.current.indexOf(pic)
                                  )}
                                </div>
                              ) : picsDayAgo.current.findIndex(
                                  (p) => p.pid === pic.pid
                                ) < pics.current.indexOf(pic) ? (
                                <div className="text-red-600 fxcenter gap-1">
                                  <div className="bg-red-600 text-white w-4 h-4 fxcenter rounded-md">
                                    <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                                  </div>

                                  {Math.abs(
                                    picsDayAgo.current.findIndex(
                                      (p) => p.pid === pic.pid
                                    ) - pics.current.indexOf(pic)
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-500 fxcenter gap-1">
                                  <div className="bg-gray-500 text-white w-4 h-4 fxcenter rounded-md">
                                    <HorizontalRuleIcon sx={{ fontSize: 20 }} />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-green-600 fxcenter gap-1">
                              <div className="bg-green-600 text-white w-4 h-4 fxcenter rounded-md">
                                <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                              </div>
                              {pics.current.length - pics.current.indexOf(pic)}
                            </div>
                          )}
                            <div
                              className="cursor-pointer hover:text-violet-600 transition"
                              onClick={() => {
                                navigate("/profile/" + pic.user_id);
                              }}
                            >
                              {pic.name.length > 6
                                ? pic.name.slice(0, 6).concat("..")
                                : pic.name}
                            </div>
                          </div>

                          <div>{pic.totalScore}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeaderboardPage;
