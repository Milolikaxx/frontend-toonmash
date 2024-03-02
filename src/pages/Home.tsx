import { useState } from "react";
function HomePage() {
  const [p1score, setP1score] = useState<number | undefined>(undefined);
  const [p2score, setP2score] = useState<number | undefined>(undefined);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-3/5 h-full flex flex-col items-center justify-start">
        <h1 className="mt-10 mb-10 text-4xl text-black font-bold prompt-regular">
          Who’s cooler? Click to choose.
        </h1>
        <div className="w-full h-3/5 flex justify-between">
          <div className="w-2/5 h-full fxcenter flex-col space-y-1">
            <img
              className="w-full h-full object-cover rounded-md cursor-pointer hover:ring-4 hover:ring-violet-600"
              src="https://i.pinimg.com/564x/e5/c5/35/e5c5359bdc716ff48b8b372d1b81f06f.jpg"
              onClick={() => calScore(1000,1000,1)}
            />
            <h4 className="text-xl text-black prompt-regular">test1</h4>
            {p1score ? <h4 className="text-xl text-red-500 prompt-regular">{p1score}</h4> : <></>}
          </div>
          <div className="w-2/5 h-full fxcenter flex-col space-y-1">
            <img
              className="w-full h-full object-cover rounded-md cursor-pointer transition hover:ring-4 hover:ring-violet-600"
              src="https://i.pinimg.com/564x/ce/d2/c6/ced2c6108c8fa422e52476eb6dbfd1a7.jpg"
              onClick={() => calScore(1000,1000,2)}
            />
            <h4 className="text-xl text-black prompt-regular">test2</h4>
            {p2score ? <h4 className="text-xl text-red-500 prompt-regular">{p2score}</h4> : <></>}
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
  function calScore(winner_score: number, loser_score: number, whoWin: number) {
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
    if (whoWin == 1) {
        setP1score(scoreA)
        setP2score(scoreB)
    }else{
        setP1score(scoreB)
        setP2score(scoreA)
    }
  }
}

export default HomePage;
