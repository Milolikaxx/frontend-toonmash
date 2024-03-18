import { useEffect, useMemo, useRef, useState } from "react";
import { PictureGetResponse } from "../model/pic_get_res";
import { Service } from "../services/Service";
import { useNavigate } from "react-router-dom";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { CircularProgress } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
function HomePage() {
  const userService = useMemo(() => {
    return new Service();
  }, []);
  const [loading, setLoading] = useState(true);
  const pics = useRef<PictureGetResponse[]>([]);
  const user = useRef<UserGetPostResponse | undefined>(undefined);
  // const [pics, setPics] = useState<PictureGetResponse[]>([]);
  const [p1, setP1] = useState<PictureGetResponse>();
  const [p2, setP2] = useState<PictureGetResponse>();
  const [p1score, setP1score] = useState<number | undefined>(undefined);
  const [p2score, setP2score] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await userService.getAllPic();
        const imgs = shuffleImages(res);
        pics.current = imgs;
        const userStr = secureLocalStorage.getItem("user");
        // const userStr = localStorage.getItem("user");
        if (userStr) {
          user.current = JSON.parse(userStr.toString());          
          if (user.current) {
            if (user.current.type == 0) {
              navigate("/");
            } else if (user.current.type == 1) {
              navigate("/homeadmin");
            }
          }
        } else {
          navigate("/");
        }
        loadNextImg();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate, userService]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {loading ? (
        <CircularProgress />
      ) : p1 && p2 ? (
        <div className="w-3/5 flex flex-col items-center justify-start">
          <h1 className="mb-10 text-4xl text-black font-bold prompt-regular">
            Who’s cooler? Click to choose.
          </h1>

          <div className="w-full h-3/5 flex justify-between items-center">
            <div className="w-2/5 h-full fxcenter flex-col space-y-1 transition">
              <img
                className="w-full h-96 object-cover rounded-md cursor-pointer transition hover:ring-4 hover:ring-violet-600"
                src={p1?.img}
                onClick={() => {
                  if (p1?.totalScore && p2?.totalScore) {
                    calScore(p1, p2, 1);
                  }
                }}
              />
              {user.current && (
                <h4 className="text-xl text-black prompt-regular">
                  {p1?.name}
                </h4>
              )}
              {p1?.totalScore && p1score ? (
                <>
                  {p1score > 0 ? (
                    <h4 className="text-xl text-green-500 prompt-regular">
                      +{p1score}
                    </h4>
                  ) : p1score == 0 ? (
                    <h4 className="text-xl text-black prompt-regular">
                      {p1score}
                    </h4>
                  ) : (
                    <h4 className="text-xl text-red-500 prompt-regular">
                      {p1score}
                    </h4>
                  )}

                  <h4 className="text-xl text-violet-600 prompt-regular">
                    {p1.totalScore + p1score}
                  </h4>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="w-2/5 h-full fxcenter flex-col space-y-1">
              <img
                className="w-full h-96 object-cover rounded-md cursor-pointer transition hover:ring-4 hover:ring-violet-600"
                src={p2?.img}
                onClick={() => {
                  if (p1?.totalScore && p2?.totalScore) {
                    calScore(p2, p1, 2);
                  }
                }}
              />
              {user.current && (
                <h4 className="text-xl text-black prompt-regular">
                  {p2?.name}
                </h4>
              )}
              {p2?.totalScore && p2score ? (
                <>
                  {p2score > 0 ? (
                    <h4 className="text-xl text-green-500 prompt-regular">
                      +{p2score}
                    </h4>
                  ) : p2score == 0 ? (
                    <h4 className="text-xl text-black prompt-regular">
                      {p2score}
                    </h4>
                  ) : (
                    <h4 className="text-xl text-red-500 prompt-regular">
                      {p2score}
                    </h4>
                  )}
                  <h4 className="text-xl text-violet-600 prompt-regular">
                    {p2.totalScore + p2score}
                  </h4>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* <div className="flex justify-between">
          <TextField inputRef={p1scoreRef} label="" variant="outlined" />
          <TextField inputRef={p2scoreRef} label="" variant="outlined" />
        </div>
        <Button variant="contained" color="primary" sx={{mt:3}} onClick={() => {
            if (p1scoreRef.current&&p2scoreRef.current) {
                calScore(+p1scoreRef.current.value,+p2scoreRef.current.value)}
            }
        } >
          vote
        </Button> */}
        </div>
      ) : (
        <h3 className="text-xl text-black prompt-regular">
          ไม่มีรูปที่จะโหวตหรือคุณโหวตครบแล้ว
        </h3>
      )}
    </div>
  );

  async function calScore(
    pWin: PictureGetResponse,
    pLose: PictureGetResponse,
    whoWin: number
  ) {
    const winner_score = pWin.totalScore;
    const loser_score = pLose.totalScore;
    const chanceWinA = 1 / (1 + 10 ** ((loser_score - winner_score) / 400));
    const chanceWinB = 1 / (1 + 10 ** ((winner_score - loser_score) / 400));
    const k_win =
      winner_score > 3000
        ? 5
        : winner_score > 2400
        ? 10
        : winner_score > 600
        ? 15
        : 25;
    const k_lose =
      loser_score > 3000
        ? 5
        : loser_score > 2400
        ? 10
        : loser_score > 600
        ? 15
        : 25;
    const winPoints = k_win * (1 - chanceWinA);
    const losePoints = k_lose * (0 - chanceWinB);
    const res = await userService.vote(
      pWin.pid,
      pLose.pid,
      winPoints,
      losePoints
    );
    if (res.affected_row == 1) {
      if (whoWin == 1) {
        setP1score(Math.round(winPoints));
        setP2score(Math.round(losePoints));
      } else {
        setP1score(Math.round(losePoints));
        setP2score(Math.round(winPoints));
      }
      delay(2000).then(() => {
        setP1score(undefined);
        setP2score(undefined);
        loadNextImg();
      });
    }
  }
  function shuffleImages(images: PictureGetResponse[]) {
    let currentIndex = images.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [images[currentIndex], images[randomIndex]] = [
        images[randomIndex],
        images[currentIndex],
      ];
    }
    return images;
  }
  function loadNextImg() {
    const selectImg: PictureGetResponse[] = pics.current.splice(0, 2);

    setP1(selectImg[0]);
    setP2(selectImg[1]);
  }
  async function delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default HomePage;
