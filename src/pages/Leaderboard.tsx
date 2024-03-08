import { useEffect, useMemo, useRef, useState } from "react";
import { PictureGetResponse } from "../model/pic_get_res";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function LeaderboardPage() {
  const userService = useMemo(() => {
    return new UserService();
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
    <div className="h-screen w-full flex justify-center items-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-3/5 h-full flex flex-col justify-center items-center">
          <div className="text-5xl text-black mt-16 mb-5 prompt-regular font-bold">
            Leaderboard
          </div>
          <div className="grid grid-cols-12 gap-4">
            {pics.current ? (
              <div className="col-span-full flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center bg-amber-400 px-2 pt-2 py-1">
                  <img
                    src={pics.current[0].img}
                    style={{ maxHeight: "200px" }}
                  />
                  <img
                    src="src\assets\1.png"
                    className="rank"
                    style={{
                      height: "60px",
                    }}
                  />
                  <div className="w-full ps-6 flex justify-between items-end font-bold prompt-regular">
                    <div>{pics.current[0].name}</div>
                    <div>{pics.current[0].totalScore}</div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {pics.current ? (
              pics.current.slice(1, 4).map((pic) => (
                <div className="col-span-4 flex justify-center items-center">
                  <img src={pic.img} style={{ maxHeight: "180px" }} />
                </div>
              ))
            ) : (
              <>ไม่มี</>
            )}
            {pics.current ? (
              pics.current.slice(4, 10).map((pic) => (
                <div className="col-span-2 flex justify-center items-center">
                  <img
                    src={pic.img}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))
            ) : (
              <>ไม่มี</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
