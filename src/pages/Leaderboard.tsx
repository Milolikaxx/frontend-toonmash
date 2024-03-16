import { useEffect, useMemo, useRef, useState } from "react";
import { PictureGetResponse } from "../model/pic_get_res";
import { Service } from "../services/Service";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function LeaderboardPage() {
  const userService = useMemo(() => {
    return new Service();
  }, []);
  const [loading, setLoading] = useState(true);
  const pics = useRef<PictureGetResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await userService.getAllPic();
        pics.current = res;
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate, userService]);
  return (
    <div className="max-h-max w-full flex justify-center items-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-3/5 h-full flex flex-col justify-center items-center ">
          <div className="text-5xl text-black mt-24 mb-5 prompt-regular font-bold">
            Leaderboard
          </div>
          <div className="grid grid-cols-12 gap-4">
            {pics.current ? (
              <>
                <div className="col-span-full flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center bg-amber-400 px-2 pt-2 py-1 rounded-md">
                    <img
                      className="rounded-t-md object-cover"
                      src={pics.current[0].img}
                      style={{ maxHeight: "200px" }}
                    />
                    <img
                      src="src\assets\1.png"
                      className="rank1"
                      style={{
                        height: "60px",
                      }}
                    />
                    <div className="w-full ps-6 flex justify-between items-end font-bold prompt-regular">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigate("/profile/" + pics.current[0].user_id);
                        }}
                      >
                        {pics.current[0].name}
                      </div>
                      <div>{pics.current[0].totalScore}</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-full md:col-span-6 lg:col-span-4 flex flex-col justify-center items-center">
                  <div className="h-full flex flex-col justify-center items-center bg-blue-700 px-2 pt-2 py-1 rounded-md">
                    <img
                      className="rounded-t-md object-cover"
                      src={pics.current[1].img}
                      style={{ maxHeight: "180px" }}
                    />
                    <img
                      src="src\assets\2.png"
                      className="rank"
                      style={{
                        height: "50px",
                      }}
                    />
                    <div className="w-full ps-6 flex justify-between items-end font-bold prompt-regular">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigate("/profile/" + pics.current[1].user_id);
                        }}
                      >
                        {pics.current[1].name}
                      </div>
                      <div>{pics.current[1].totalScore}</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-full md:col-span-6 lg:col-span-4 flex flex-col justify-center items-center">
                  <div className="h-full flex flex-col justify-center items-center bg-amber-700 px-2 pt-2 py-1 rounded-md">
                    <img
                      className="rounded-t-md"
                      src={pics.current[2].img}
                      style={{
                        maxHeight: "180px",
                        maxWidth: "180px",
                        objectFit: "cover",
                      }}
                    />
                    <img
                      src="src\assets\3.png"
                      className="rank"
                      style={{
                        height: "50px",
                      }}
                    />
                    <div className="w-full ps-6 flex justify-between items-end font-bold prompt-regular">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigate("/profile/" + pics.current[2].user_id);
                        }}
                      >
                        {pics.current[2].name}
                      </div>
                      <div>{pics.current[2].totalScore}</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-full md:col-span-6 lg:col-span-4 flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center bg-black px-2 pt-2 py-1 rounded-md object-cover">
                    <img
                      className="rounded-t-md w-36 h-36 xl:w-44 xl:h-44 object-cover"
                      src={pics.current[3].img}
                    />

                    <div className="w-full flex justify-between items-end font-bold prompt-regular">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigate("/profile/" + pics.current[3].user_id);
                        }}
                      >
                        {pics.current[3].name}
                      </div>
                      <div>{pics.current[3].totalScore}</div>
                    </div>
                  </div>
                </div>

                {pics.current.slice(4, 10).map((pic) => (
                  <div className="col-span-full md:col-span-6 lg:col-span-4 xl:col-span-2 flex justify-center items-center mb-3">
                    <div className="flex flex-col justify-center items-center bg-black px-2 pt-2 py-1 rounded-md">
                      <img
                        className="rounded-t-md w-36 h-36 xl:w-32 xl:h-32 object-cover"
                        src={pic.img}
                        style={{
                          maxHeight: "150px",
                          minWidth: "100px",
                        }}
                      />
                      <div className="w-full flex justify-between items-end  font-bold prompt-regular">
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/profile/" + pic.user_id);
                          }}
                        >
                          {pic.name.length > 6
                            ? pic.name.slice(0, 6).concat("..")
                            : pic.name}
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
      )}
    </div>
  );
}

export default LeaderboardPage;
