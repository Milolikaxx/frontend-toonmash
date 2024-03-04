import { useEffect, useState } from "react";
import { PictureGetResponse } from "../model/pic_get_res";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
function HomePage() {
  const userService = new UserService();
  const [p1, setP1] = useState<PictureGetResponse>();
  const [p2, setP2] = useState<PictureGetResponse>();
  const [p1score, setP1score] = useState<number | undefined>(undefined);
  const [p2score, setP2score] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      let res = await userService.getPicByID(1);
      setP1(res);
      res = await userService.getPicByID(2);
      setP2(res);
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user: UserGetPostResponse = JSON.parse(userStr);
        if (user.type == 0) {
          navigate("/");
        } else if (user.type == 1) {
          navigate("/homeadmin");
        }
      }
    };
    loadData();
  }, []);

  return (
    <div className="h-full w-screen flex justify-center items-center">
      <div className="w-3/5 h-full flex flex-col items-center justify-start">
        <h1 className="mt-10 mb-10 text-4xl text-black font-bold prompt-regular">
          Who’s cooler? Click to choose.
        </h1>
        <div className="w-full h-3/5 flex justify-between">
          <div className="w-2/5 h-full fxcenter flex-col space-y-1">
            <img
              className="w-full h-96 object-cover rounded-md cursor-pointer hover:ring-4 hover:ring-violet-600"
              src={p1?.img}
              onClick={() => {
                if (p1?.totalScore && p2?.totalScore) {
                  calScore(p1, p2, 1);
                }
              }}
            />
            <h4 className="text-xl text-black prompt-regular">{p1?.name}</h4>
            {p1score ? (
              <h4 className="text-xl text-red-500 prompt-regular">{p1score}</h4>
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
            <h4 className="text-xl text-black prompt-regular">{p2?.name}</h4>
            {p2score ? (
              <h4 className="text-xl text-red-500 prompt-regular">{p2score}</h4>
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
    const scoreA = k_win * (1 - chanceWinA);
    const scoreB = k_lose * (0 - chanceWinB);
    const up1 = await userService.vote(1, pWin.pid, scoreA, 1);
    const up2 = await userService.vote(1, pLose.pid, scoreB, 0);
    if (up1.affected_row == 1 && up2.affected_row == 1) {
      if (whoWin == 1) {
        setP1score(Math.round(scoreA));
        setP2score(Math.round(scoreB));
      } else {
        setP1score(Math.round(scoreB));
        setP2score(Math.round(scoreA));
      }
    }
  }
}

export default HomePage;
